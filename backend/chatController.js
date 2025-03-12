const express = require('express');
const router = express.Router();
const chatService = require('./chatService');

// POST endpoint to process a new message
router.post('/', async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ error: 'userId and message are required' });
    }
    const result = await chatService.processMessage(userId, message);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to retrieve conversation history
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const history = chatService.getChatHistory(userId);
  res.json(history);
});

module.exports = router;
