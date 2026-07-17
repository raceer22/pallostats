const leagueRouter = require('express').Router();
const axios = require('axios');
const config = require('config');
const headers = require('../utils/headers');

const footballApi = axios.create({
  baseURL: config.get('footballData.api'),
  headers: {
    'X-Auth-Token': config.get('footballData.apiKey'),
    ...headers
  }
});

leagueRouter.get('/', async (req, res) => {
  try {
    const response = await footballApi.get('/competitions');
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
  try {
    const response = await footballApi.get(`/competitions/${leagueCode}/teams`);
    return res.json(response.data);
  } catch (error) {
    console.log('Error fetching teams:', error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Failed to fetch league teams.'
    });
  }
});

module.exports = leagueRouter;