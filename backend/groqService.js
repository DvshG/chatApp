const axios = require('axios');
const GROQ_API_KEY = process.env.GROQ_API_KEY; // Ensure this is set

// Optional helper to format response text for better readability.
function formatResponse(text) {
  return text.trim();
}

async function getChatResponse(history) {
  try {
    // Groq expects an array of messages with keys: role and content.
    const messages = history.map(entry => ({
      role: entry.role,
      content: entry.message
    }));

    // Call Groq's chat completions endpoint.
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',  // Replace with your chosen Groq model.
        messages: messages,
        // Optionally add other parameters:
        // frequency_penalty: 0,
        // presence_penalty: 0,
        // temperature: 1
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        }
      }
    );

    console.log("Groq API response:", response.data);
    
    // Parse the assistant's reply.
    const assistantReply = formatResponse(response.data.choices[0].message.content);
    return assistantReply;
  } catch (error) {
    const detailedError = error.response?.data || error.message;
    console.error('Error from Groq API:', detailedError);
    return `Error: ${typeof detailedError === 'string' ? detailedError : JSON.stringify(detailedError)}`;
  }
}

module.exports = {
  getChatResponse
};
