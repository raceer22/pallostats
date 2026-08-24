const leagueRouter = require('express').Router();
const redisClient = require('../utils/redis');
const footballApi = require('./footballApi');

leagueRouter.get('/:id/teams', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `league_full:${id}`;

  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
});

module.exports = leagueRouter;
