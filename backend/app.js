const express = require('express');
const cors = require('cors');
console.log('Backend is up and running!');
const searchRouter = require('./controllers/search');
const leagueRouter = require('./controllers/leagues');

const app = express();
app.use(cors());

app.get('/api/ping', (req, res) => {
  res.send('Backend is up!');
});

app.use('/api/search', searchRouter);
app.use('/api/leagues', leagueRouter);

module.exports = app;
