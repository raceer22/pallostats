# Start Redis Server
```
docker run -d \
  --name redis-server \
  --restart unless-stopped \
  -p 6379:6379 \
  -v redis-data:/data \
  custom-redis
```
```
```
```
```
```
