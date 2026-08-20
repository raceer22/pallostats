docker run -d \
  --name pallostats-redis \
  --restart unless-stopped \
  -p 6379:6379 \
  -v redis-data:/data \
  redis redis-server --appendonly yes