const groqService = require('./groqService');

// In-memory store for conversation history: { userId: [ { role, message } ] }
const chatHistories = {};

async function processMessage(userId, message) {
  if (!chatHistories[userId]) {
    chatHistories[userId] = [];
  }
  
  // Add user's message to history
  chatHistories[userId].push({ role: 'user', message });
  
  // Use full conversation history for context
  const history = chatHistories[userId];
  
  // Get AI response from Groq API
  const assistantResponse = await groqService.getChatResponse(history);
  
  // Add assistant's reply to history
  chatHistories[userId].push({ role: 'assistant', message: assistantResponse });
  
  return { response: assistantResponse, history: chatHistories[userId] };
}

function getChatHistory(userId) {
  return chatHistories[userId] || [];
}

module.exports = {
  processMessage,
  getChatHistory
};
