import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';  // Import CSS styles

const socket = io('https://ws-demo-backend.onrender.com');

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');  // Clear input after sending
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">WebSocket Chat</h1>
      <div className="chat-box">
        <ul className="messages-list">
          {messages.map((msg, idx) => (
            <li key={idx} className="message-item">{msg}</li>
          ))}
        </ul>
      </div>
      <div className="input-container">
        <input 
          type="text" 
          className="chat-input" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type a message"
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
