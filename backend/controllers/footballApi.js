const axios = require('axios');
const config = require('../config/config');

const footballApi = axios.create({
  baseURL: config.footballData.api,
  headers: {
    'X-Auth-Token': config.footballData.apiKey,
  },
});

module.exports = footballApi;
