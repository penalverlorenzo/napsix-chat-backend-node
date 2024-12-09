import OpenAI from "openai"
import { config } from "../config/index.js"

const openai = new OpenAI({apiKey: config.openaiKey})




export class AssistantService {
    async createAssistant(information){
        const assistant = await openai.beta.assistants.create({
            name: "Pedro",
            instructions:
              "You are a translator, when you are asked you will translate the given text to the asked language.",
            tools: [{ type: "code_interpreter" }],
            model: "gpt-3.5-turbo",
            ...information});
          console.log(assistant);
          return assistant
          
    }
    async editAssistant(id, modifications){
        try{
            const editedAssistant = await  openai.beta.assistants.update(id, modifications)
            console.log(editedAssistant);
            return editedAssistant
        }catch(e){
            console.log(e);
        }
        
    }
    async deleteAssistant(id){
        const response = await openai.beta.assistants.del(id)
        console.log(response);
    }
    async getUserAssistants(){
        const myAssistants = await openai.beta.assistants.list({
            order: "desc",
            limit: "20",
          });
        return myAssistants
        
    }

}

