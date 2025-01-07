import { Router } from 'express';
import { AssistantService } from '../service/assistantService.js';

export const assistantRouter = Router();

const service = new AssistantService()

assistantRouter.get('/', async (req, res) => {
  try {
    const assistant = await service.getUserAssistants()
    console.log({assistant});
    
    res.json(assistant);
  } catch (error) {
    console.log(error);
  }
})

assistantRouter.post('/create', async (req, res) => { 
    console.log("Creating", req.body);
  try {
    
    const { information } = req.body;
    
    const created = await service.createAssistant(information);
  
    console.log({created});
    res.json({created});
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating your assistant");
  }
})
assistantRouter.post('/chat', async (req, res) => { 
    console.log("chat", req.body);
  try {
    
    const { assistantId, message, userId, threadID} = req.body;
    
    const created = await service.useAssistant({assistantId, message, userId, threadID});
  
    console.log({created});
    res.json({response: created});
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating your assistant");
  }
})

 assistantRouter.delete("/", async (req, res) => { 
    try {
      const { id } = req.body;
      console.log({id});
      
      await service.deleteAssistant(id);
  
      
      res.send("Deleted");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error deleting your assistant");
    }
  })

assistantRouter.post("/edit", async (req, res) => { 
    try {
      const { id, modifications } = req.body;
      console.log({id, modifications});
      
      const editedAssistant = await service.editAssistant(id,modifications);
  
    
      console.log({editedAssistant});
      
      res.json(editedAssistant);
    } catch (error) {
      console.log({error});
      res.status(500).send("Error editing your assistant");
    }
  })