import 'dotenv/config'

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash-001";

const getGeminiApiResponce = async(message) => {
      const options ={
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        { role: "user", parts: [{ text: massage }] }
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
}

export default getGeminiApiResponce;