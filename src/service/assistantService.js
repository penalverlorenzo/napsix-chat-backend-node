import OpenAI from "openai"
import { config } from "../config/index.js"

const openai = new OpenAI({ apiKey: config.openaiKey })




export class AssistantService {
    constructor(){
    this.threads = {}
    }

    async createAssistant(information) {
        const assistant = await openai.beta.assistants.create({
            name: "Pedro",
            instructions:
                "You are a translator, when you are asked you will translate the given text to the asked language.",
            tools: [{ type: "code_interpreter" }],
            model: "gpt-3.5-turbo",
            ...information
        });
        console.log(assistant);
        return assistant

    }
    async editAssistant(id, modifications) {
        try {
            const editedAssistant = await openai.beta.assistants.update(id, modifications)
            console.log(editedAssistant);
            return editedAssistant
        } catch (e) {
            console.log(e);
        }

    }
    async deleteAssistant(id) {
        const response = await openai.beta.assistants.del(id)
        console.log(response);
    }
    async getUserAssistants() {
        const myAssistants = await openai.beta.assistants.list({
            order: "desc",
            limit: "20",
        });
        return myAssistants

    }

    
    async useAssistant({id,userMessage,userId, threadID}) {
        console.log({id,userMessage,userId});
        if (!threadID) {
            const thread = await openai.beta.threads.create();
            if (!this.threads[userId]) {
                this.threads[userId] = thread
            }
        }
        
        const message = await openai.beta.threads.messages.create(
            threadID || this.threads[userId].id || thread.id,
            {
                role: "user",
                content: userMessage
            }
        );
        let run = await openai.beta.threads.runs.createAndPoll(
            threadID || this.threads[userId].id || thread.id,
            {
                assistant_id: id
            }
        );
        let responses;
        if (run.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(
              run.thread_id
            );
            for (const message of messages.data.reverse()) {
              console.log(`${message.role} > ${message.content[0].text.value}`);
              if (message.role === "assistant") {
                  responses = message.content[message.content.length - 1].text.value
              }
              console.log(responses);
            }
          } else {
            console.log(run.status);
            return run.status
          }
          return responses
    }

}

