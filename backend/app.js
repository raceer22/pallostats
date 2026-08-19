const express = require('express');
const searchRouter = require('./controllers/search');

const app = express();

app.get('/api/ping', (req, res) => {
  res.send('Backend is up!');
});

app.use('/api/search', searchRouter);

module.exports = app;
