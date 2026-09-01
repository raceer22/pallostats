const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config();

const config = {
  footballData: {
    apiURL: process.env.FOOTBALL_API_URL,
    apiKey: process.env.FOOTBALL_API_KEY,
    timeout: 5000,
  },
  server: {
    host: 'localhost',
    port: 3000,
  },
};

module.exports = config;

