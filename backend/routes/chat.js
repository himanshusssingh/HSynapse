import express from "express";
import Thread from '../models/Thread.js'
import getGeminiResponce from '../utils/gemini.js'

const router = express.Router();


router.post("/test", async(req, res) => {
    try{
        const thread = new Thread({
            threadId: "abc",
            title: "first title"
        });

        const responce = await thread.save();
        res.send(responce);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Faile to save!"})
    }
})

//Get All Threads
router.get("/thread", async(req, res) => {
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1});
        res.json(threads);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch Threads!"})
    }
})

//Get single Thread
router.get("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;
    
    try{
        const thread = await Thread.findOne({threadId});
        if(!threadId) {
            res.status(404).json({error: "Thread not found!"});
        }
        res.json(thread.message)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch Thread!"});
    }
})

//Delete a Thread
router.delete("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;

    try{
        const thread = await Thread.findOneAndDelete({threadId});
        if(!thread) {
            res.status(404).json({error: "Thread not deleted!"});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch Thread!"});
    }
})

//Chat
router.post("/chat", async(req, res) => {
    console.log(req.body.threadId)
    console.log(req.body.contents[0].parts[0].text)
    const {threadId, contents} = req.body;
    const message = contents[0].parts[0].text;


    if(!threadId || !message) {
        res.status(404).json({error: "Missing the Required Field."})
    }

    try {
        let thread = await Thread.findOne({threadId});
        if(!thread) {
            thread = new Thread({
                threadId,
                title: message,
                message: [{role: "user", content: message}]
            })
        }
        else {
            thread.message.push({role: "user",content: message});
        }

        const geminiReply = await getGeminiResponce(message);
        thread.message.push({role: "assistant", content: "geminiReply"});
        thread.updatedAt = new Date();

        await thread.save();
        res.json({reply: geminiReply});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Something went wrong!"});
    }
})

export default router;