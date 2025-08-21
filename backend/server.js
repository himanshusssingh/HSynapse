import express from 'express';
import 'dotenv/config';
import cors from 'cors';


const app = express();
const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash-001";
const PORT = '8080';


app.use(express.json());
app.use(cors());



app.post("/test", async(req, res) => {
  const options ={
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        { role: "user", parts: [{ text: "Write a haiku about coding." }] }
      ]
    })
  }

  try{
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`, options);
    const data = await response.json();
    res.send(data.candidates[0].content.parts[0].text);
  }
  catch(err) {
    console.log(`Fetch error: ${err}`);
  }
})




app.listen(PORT, () => {
  console.log( `App is listening on port: ${PORT}`);
})