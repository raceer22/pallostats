const express = require('express');
const { playerRouter, teamRouter, leagueRouter } = require('./controllers/palloliitto');

const app = express();

app.use('/api/player', playerRouter);

module.exports = app;
