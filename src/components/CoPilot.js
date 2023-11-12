// CoPilot.js
import React, { useState } from 'react';

const CoPilot = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display user input in the chat
    setChatHistory([...chatHistory, { text: inputText, isUser: true }]);

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
      setChatHistory([...chatHistory, { text: responseData.chatContent, isUser: false }]);
    } catch (error) {
      console.error('Error sending/receiving data:', error.message);
    }

    // Clear the input field after submission
    setInputText('');
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '80%', maxHeight: '80vh', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px', backgroundColor: '#fff' }}>
        {chatHistory.map((item, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: item.isUser ? 'row-reverse' : 'row', marginBottom: '16px' }}>
            <div style={{ maxWidth: '70%', padding: '10px', borderRadius: '8px', backgroundColor: item.isUser ? '#4caf50' : '#e0e0e0', color: item.isUser ? '#fff' : '#333' }}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: '1', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default CoPilot;
