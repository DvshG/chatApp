const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatController = require('./chatController');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/chat', chatController);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
