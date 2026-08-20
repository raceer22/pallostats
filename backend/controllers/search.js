const searchRouter = require('express').Router();
const axios = require('axios');
const config = require('config');
const redisClient = require('../utils/redis');

const footballApi = axios.create({
  baseURL: config.get('footballData.api'),
  headers: {
    'X-Auth-Token': config.get('footballData.apiKey'),
  },
});

searchRouter.get('/', async (req, res) => {
  const cacheKey = 'search:all_entities';

  const query = req.query.q?.trim().toLowerCase();
  const category = req.query.category?.toUpperCase() || 'ALL';

  let data = await redisClient.get(cacheKey);
  if (!cachedData) {
    try {
      data = await footballApi.get('/competitions').data;
      await redisClient.set(cacheKey, JSON.stringify(data), {
        EX: 86400,
      });
    } catch (error) {
      console.log('API error:', error);
    }
  }

  const results = {
    leagues: [],
    teams: [],
    players: [],
  };

  if (data.competitions?.name?.toLowerCase().includes(query)) {
    results.leagues.push({
      id: data.competitions.id,
    });
  }
});

searchRouter.get('/list', async (req, res) => {
  const cacheKey = 'search:all_entities';

  const cachedData = await redisClient.get(cacheKey);

  if (!cachedData) return null;
  return res.json(JSON.parse(cachedData));
});

module.exports = searchRouter;
