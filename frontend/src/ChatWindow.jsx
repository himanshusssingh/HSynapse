import React from "react";
import Chat from "./Chat.jsx";
import "./ChatWindow.css";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState } from "react";
import { RingLoader } from "react-spinners";


function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId } =
    useContext(MyContext);
    const [loading, setLoading] = useState(false)

  const getReply = async () => {
    setLoading(true)

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        threadId: currThreadId,
      }),
    };

    try {
      const responce = await fetch("http://localhost:8080/api/chat", options);
      const res = await responce.json();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false)
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          SigmaGPT <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv">
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      <Chat></Chat>

      <RingLoader color="white" size={150} loading={loading}></RingLoader>

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          ></input>
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-arrow-up"></i>
          </div>
        </div>
        <p className="info">
          HSynapse can make mistakes. Check important info. See Cookie
          Preferences.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
