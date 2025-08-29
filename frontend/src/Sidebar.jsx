import React from 'react';
import './Sidebar.css'

function Sidebar (){
    return(
 <section className="sidebar">
            <button>
                <img src="src/assets/ChatGPT-logo.png" alt="gpt logo" className="logo"></img>
                <span><i className="fa-regular fa-pen-to-square"></i></span>
            </button>


            <ul className="history">
                <li>Threads</li>
                <li>Threads</li>
                <li>Threads</li>
                <li>Threads</li>
                <li>Threads</li>
            </ul>
 
            <div className="sign">
                <p>By Himanshu Singh &hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar