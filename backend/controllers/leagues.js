const leagueRouter = require('express').Router();
const redisClient = require('../utils/redis');
const footballApi = require('./footballApi');

leagueRouter.get('/:id/teams', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const cacheKey = `league_full:${id}`;

  const cachedData = await redisClient.get(cacheKey);
  console.log(cachedData)
  if (cachedData) {
    return res.json(JSON.parse(cachedData))
  }
  // if (!data) {
  //   try {
  //     data = (await footballApi.get(`/competitions/${id}/teams`)).data
  //     await redisClient.set(cacheKey, JSON.stringify(data), {
  //       EX: 86400,
  //     })
  //   } catch (error) {
  //     console.log('API error:', error)
  //   }
  // }
});

module.exports = leagueRouter;
