const playerRouter = require('express').Router();
const teamRouter = require('express').Router();
const leagueRouter = require('express').Router();
const axios = require('axios');
const config = require('config');
const headers = require('../utils/headers');
const Player = require('../models/player');
const palloliittoDatabase = require('../utils/palloliittoDatabase');

const port = config.get('server.port');

playerRouter.get('/', async (req, res) => {
  console.log('success');
});

playerRouter.get('/:id', async (req, res) => {
  const playerId = req.params.id;
  try {
    const player = await Player.findById(playerId);

    if (player) {
      return res.json(player);
    }
  } catch (error) {
    console.log('error', error);
  }

  try {
    const palloliittoPlayer = await palloliittoDatabase.getPlayer(playerId);
    res.json(palloliittoPlayer);
  } catch (error) {
    console.log('error', error);
  }
});

module.exports = {
  playerRouter,
  teamRouter,
  leagueRouter,
};
