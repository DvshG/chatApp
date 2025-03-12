import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Chat({ userId }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch conversation history from the backend
  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`/api/chat/${userId}`);
      setChatHistory(response.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // Auto-scroll to the bottom whenever the chat history updates
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Send message to the backend
  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      // Optimistically add user's message to the chat history
      setChatHistory(prev => [...prev, { role: 'user', message }]);
      
      const response = await axios.post('/api/chat', { userId, message });
      // Update chat history with full conversation including AI reply
      setChatHistory(response.data.history);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  // Send message on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          height: '300px',
          overflowY: 'scroll',
          marginBottom: '10px'
        }}
      >
        {chatHistory.map((entry, index) => (
          <div key={index} style={{ marginBottom: '10px', whiteSpace: 'pre-wrap' }}>
            <strong>{entry.role === 'user' ? 'You' : 'Assistant'}:</strong> {entry.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={{ width: '75%', padding: '8px' }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{ padding: '8px 16px', marginLeft: '5px' }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default Chat;
