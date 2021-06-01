# bull-monitor-docker

The docker file for bull-monitor

## Run

The server will run on port 8080

```sh
docker run -e "REDIS_URI=redis://localhost:6379" -e "QUEUE_NAMS=test,test2,test3"  -p 8888:8080 samuraitruong/bull-monitor

```

or docker-compose

```
version: '3.9'
services:
  bull-monitor:
    image: samuraitruong/bull-monitor
    ports:
      - 8080:8080
    environment:
      REDIS_URI: redis://localhost:6379
      QUEUE_NAMES: testme
      PROVIDER: express

```
