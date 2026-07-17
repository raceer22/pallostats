const express = require('express');
const mongoose = require('mongoose');
// const { playerRouter, teamRouter, leagueRouter } = require('./controllers/palloliitto');
const playerRouter = require('./controllers/players');
const teamRouter = require('./controllers/teams');
const leagueRouter = require('./controllers/leagues');

const app = express();

app.get('/api/ping', (req, res) => {
  res.send('Backend is up!');
})

app.use('/api/player', playerRouter);
app.use('/api/team', teamRouter);
app.use('/api/league', leagueRouter);

module.exports = app;
