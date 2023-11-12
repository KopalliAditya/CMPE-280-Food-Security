import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const CoPilot = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Scroll to the bottom of the chat history when it updates
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatHistory]);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display user input in the chat
    const userMessage = { text: inputText, isUser: true };
    setChatHistory([...chatHistory, userMessage]);

    // Send user input and any necessary data (e.g., PDF) to the backend for processing
    try {
      const response = await fetch('http://localhost:3001/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      // Display the response from the backend in the chat
      const botMessage = { text: responseData.chatContent, isUser: false };
      setChatHistory((prevChat) => [...prevChat, botMessage]);
    } catch (error) {
      console.error('Error sending/receiving data:', error.message);
    }

    // Clear the input field after submission
    setInputText('');
  };

  const handleBack = () => {
    // Handle back button click (you can customize this logic)
    navigate('/home');
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f4f4f4' }}>

<div style={{ border: '2px solid #333', borderRadius: '10px', maxWidth: '100%', marginLeft: '750px',marginRight: '750px' , overflow: 'hidden' }}>
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <h1 style={{ fontWeight: 'bold' }}>Co-Pilot</h1>
      </div>
      </div>
      <div id="chat-container" style={{ flex: '1', overflowY: 'auto', padding: '20px' }}>
        {chatHistory.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: item.isUser ? 'flex-end' : 'flex-start', marginBottom: '16px' }}>
            <div style={{ maxWidth: '70%', padding: '10px', borderRadius: '8px', backgroundColor: item.isUser ? '#4caf50' : '#e0e0e0', color: item.isUser ? '#fff' : '#333' }}>
              {item.text}
            </div>
          </div>
          
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', padding: '20px', marginLeft: '270px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: '0.8', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 25px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
          Send
        </button>
        <button onClick={handleBack} style={{ padding: '10px 25px', backgroundColor: 'rgb(128 111 111)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
          Home
        </button>
      </form>
    </div>
  );
};

export default CoPilot;
