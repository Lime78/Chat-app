import { useState } from 'react'
import './App.css'

function Chat() {
  const [] = useState(0)

  return (
    <>
    
    <div className="parent">
     
      <div className="child2">
        <h1>Chat</h1>
        <div className="chat">
          <div className="message">
            
          </div>
          <div className="message">
          </div>
        
        <input type="text" placeholder="Message" />
        <button>Send</button>
      </div>
      </div>
      
    </div>
    </>
  )
}

export default Chat
