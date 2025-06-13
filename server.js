const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./database');
const app = express();
const PORT = 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  const { name, photo } = req.body;
  db.run('INSERT INTO users (name, photo) VALUES (?, ?)', [name, photo], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Error saving data');
    }
    res.send('Data saved successfully!');
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
