const leagueRouter = require('express').Router();
const axios = require('axios');
const config = require('config');
const headers = require('../utils/headers');
const redisClient = require('../utils/redis')

const footballApi = axios.create({
  baseURL: config.get('footballData.api'),
  headers: {
    'X-Auth-Token': config.get('footballData.apiKey'),
    ...headers
  }
});

const TTL_COMPETITIONS = 86400 * 7;
const TTL_TEAMS = 86400;

leagueRouter.get('/all', async (req, res) => {
  const cacheKey = `competitions:all`
  try {
    const cachedData = await redisClient.get(cacheKey)
    if (cachedData) {
      return res.json(JSON.parse(cachedData))
    }

    const response = await footballApi.get('/competitions');
    await redisClient.set(cacheKey, JSON.stringify(response.data), {
      EX: TTL_COMPETITIONS
    })

    return res.json(response.data);
  } catch (error) {
    console.log('Error fetching competitions:', error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Failed to fetch leagues.'
    });
  }
});

leagueRouter.get('/:code/teams', async (req, res) => {
  const leagueCode = req.params.code;
  const cacheKey = `competitions:${leagueCode}:teams`
  
  try {
    const cachedData = await redisClient.get(cacheKey)
    if (cachedData) {
      return res.json(JSON.parse(cachedData))
    }

    const response = await footballApi.get(`/competitions/${leagueCode}/teams`);
    await redisClient.set(cacheKey, JSON.stringify(response.data), {
      EX: TTL_TEAMS
    })

    return res.json(response.data);
  } catch (error) {
    console.log('Error fetching teams:', error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Failed to fetch league teams.'
    });
  }
});

module.exports = leagueRouter;