const express = require('express');
const app = express();

app.use(express.json());

app.post('/logs', (req, res) => {
  const { level, message } = req.body;
  console.log(`[${level}] ${message}`);
  // Here you could save logs to a file or database
  res.sendStatus(200);
});

app.listen(3001, () => console.log('Logging server running on port 3001'));
