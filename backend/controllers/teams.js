const teamRouter = require('express').Router();
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

teamRouter.get('/', async (req, res) => {
  // res.status(200).send('Team API Online');
  try {
    const response = await footballApi.get(`/teams`);
    return res.json(response.data)
  } catch (error) {
    console.log(error)
  }
});

teamRouter.get('/:id', async (req, res) => {
  const teamId = req.params.id;
  try {
    const response = await footballApi.get(`/teams/${teamId}`);
    return res.json(response.data);
  } catch (error) {
    console.log('Error fetching team:', error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Failed to fetch team details.'
    });
  }
});

module.exports = teamRouter;