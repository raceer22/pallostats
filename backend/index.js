const app = require('./app');
const redisClient = require('./utils/redis');
const config = require('./config/config');

const port = config.server.port || 3000;

const startServer = async () => {
  try {
    await redisClient.connect();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
