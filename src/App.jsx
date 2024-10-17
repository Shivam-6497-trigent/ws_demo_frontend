import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('https://ws-demo-backend.onrender.com');

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const handleSetName = () => {
    if (username.trim()) {
      setIsNameSet(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', { username, message });  // Send the username and message to the server
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      {!isNameSet ? (
        <div className="set-name-container">
          <h1>Enter Your Name</h1>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Your Name"
          />
          <button onClick={handleSetName}>Join Chat</button>
        </div>
      ) : (
        <div className="chat-box">
          <h1>Group Chat</h1>
          <div className="messages">
            <ul>
              {messages.map((msg, idx) => (
                <li key={idx}><strong>{msg.username}:</strong> {msg.message}</li>
              ))}
            </ul>
          </div>
          <div className="message-input">
            <input 
              type="text" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
