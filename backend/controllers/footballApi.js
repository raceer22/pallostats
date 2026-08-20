const axios = require('axios');
const config = require('config');

const footballApi = axios.create({
  baseURL: config.get('footballData.api'),
  headers: {
    'X-Auth-Token': config.get('footballData.apiKey'),
  },
});

module.exports = footballApi;
