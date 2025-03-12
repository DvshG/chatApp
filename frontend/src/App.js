import React from 'react';
import Chat from './Chat';

function App() {
  const userId = 'user1'; // Replace with dynamic user IDs in production

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>LLM Chat Application</h1>
      <Chat userId={userId} />
    </div>
  );
}

export default App;
