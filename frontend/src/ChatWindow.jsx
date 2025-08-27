import React from 'react';
import Chat from './Chat.jsx';
import './ChatWindow.css'

function ChatWindow () {
    return(
        <div className="chatWindow">
            <div className="navbar">
                <span>SigmaGPT <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" >
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>

            <Chat></Chat>

            
            
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything"
                        value={prompt}
                    >   
                    </input>
                    <div id="submit" ><i class="fa-solid fa-arrow-up"></i></div>
                </div>
                <p className="info">
                    HSynapse can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow