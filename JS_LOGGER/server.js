const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/log', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const time = new Date().toISOString();
  const logEntry = `IP: ${ip}, Time: ${time}\n`;

  fs.appendFile('access.log', logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file', err);
      res.status(500).send('Server error');
    } else {
      res.send('Logged successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});