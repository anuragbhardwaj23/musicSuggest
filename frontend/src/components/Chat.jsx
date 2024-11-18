import React, { useState } from 'react';
import axios from '../services/api';
import './Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('"http://localhost:5000/api/chat', { userMessage: message });
      setResponse(data.recommendations);
    } catch (err) {
      console.error('Chat Error:', err);
    }
  };

  return (
    <div className="chat-container">
      <form onSubmit={handleChatSubmit}>
        <textarea
          placeholder="Ask for music recommendations..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Send</button>
      </form>
      {response && (
        <ul className="recommendations">
          {response.map((rec, idx) => (
            <li key={idx}>
              <a href={rec.url} target="_blank" rel="noopener noreferrer">
                {rec.name} by {rec.artist}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Chat;
