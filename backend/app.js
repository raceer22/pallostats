const express = require('express');
const playerRouter = require('./controllers/players');
const teamRouter = require('./controllers/teams');
const leagueRouter = require('./controllers/leagues');
const searchRouter = require('./controllers/search')

const app = express();

app.get('/api/ping', (req, res) => {
  res.send('Backend is up!');
});

app.use('/api/player', playerRouter);
app.use('/api/team', teamRouter);
app.use('/api/competition', leagueRouter);
app.use('/api/search', searchRouter);

module.exports = app;
