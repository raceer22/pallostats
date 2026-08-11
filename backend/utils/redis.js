const { createClient } = require('redis');

const redisClient = createClient();

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis connected'));

module.exports = redisClient;
