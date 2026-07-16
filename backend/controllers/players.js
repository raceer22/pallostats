const playerRouter = require('express').Router();
const axios = require('axios');
const config = require('config');
const headers = require('../utils/headers');
const Player = require('../models/player');
const palloliittoDatabase = require('../utils/palloliittoDatabase');

const footballApi = axios.create({
  baseURL: config.get('footballData.api'),
  headers: {
    'X-Auth-Token': config.get('footballData.apiKey'),
    ...headers
  }
});

playerRouter.get('/', async (req, res) => {
  console.log('Player router health check success');
  res.status(200).send('Player API Online');
});

playerRouter.get('/:id', async (req, res) => {
  const playerId = req.params.id;

  try {
    const player = await Player.findById(playerId);
    if (player) {
      return res.json(player);
    }
  } catch (error) {
    console.log('Error searching local Player DB:', error.message);
  }

  try {
    const palloliittoPlayer = await palloliittoDatabase.getPlayer(playerId);
    if (palloliittoPlayer.id) {
      return res.json(palloliittoPlayer);
    }
  } catch (error) {
    console.log('Error searching Palloliitto database:', error.message);
  }

  try {
    const response = await footballApi.get(`/persons/${playerId}`);
    const apiPlayer = response.data;

    if (apiPlayer) {
      try {
        const newPlayer = new Player({
          _id: playerId,
          name: apiPlayer.name,
          firstName: apiPlayer.firstName,
          lastName: apiPlayer.lastName,
          dateOfBirth: apiPlayer.dateOfBirth,
          nationality: apiPlayer.nationality,
          position: apiPlayer.position,
        });
        await newPlayer.save();
      } catch (saveError) {
        console.log('Failed to cache player to local DB:', saveError.message);
      }

      return res.json(apiPlayer);
    }
  } catch (error) {
    console.log('Error fetching from football-data.org:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data?.message || 'External API Error'
      });
    }
  }

  return res.status(404).json({ error: 'Player not found in any registered database.' });
});

playerRouter.get('/:id/matches', async (req, res) => {
  const playerId = req.params.id;
  const { limit, status } = req.query;

  try {
    const response = await footballApi.get(`/persons/${playerId}/matches`, {
      params: { limit, status }
    });
    return res.json(response.data);
  } catch (error) {
    console.log('Error getting matches:', error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Failed to fetch player matches.'
    });
  }
});

playerRouter.post('/favorite', async (req, res) => {
  const { playerId, name } = req.body;

  if (!playerId) {
    return res.status(400).json({ error: 'playerId is required.' });
  }

  try {
    return res.status(201).json({ success: true, message: `Player ${name || playerId} favorited.` });
  } catch (error) {
    console.log('Error favoriting player:', error.message);
    return res.status(500).json({ error: 'Failed to favorite player.' });
  }
});

module.exports = playerRouter;