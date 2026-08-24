const searchRouter = require('express').Router();
const redisClient = require('../utils/redis');
const footballApi = require('./footballApi');

searchRouter.get('/', async (req, res) => {
  const cacheKey = 'search:all_entities';

  const query = req.query.q?.trim().toLowerCase();
  const category = req.query.category?.toUpperCase() || 'ALL';

  let data = await redisClient.get(cacheKey);
  if (!data) {
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

searchRouter.get('/entities', async (req, res) => {
  const cacheKey = 'search:all_entities';

  const cachedData = await redisClient.get(cacheKey);

  if (!cachedData) return null;
  return res.json(JSON.parse(cachedData));
});

module.exports = searchRouter;
