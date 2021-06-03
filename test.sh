
docker run -d --network host -e "REDIS_URI=redis://localhost:6379" \
-e "QUEUE_NAMS=test,test2,test3"  \
-e "PROVIDER=$1" \
-p 8080:8080 \
--name test bull-monitor

#while [ "`docker inspect -f {{.State.Health.Status}} test`" != "healthy" ]; do     sleep 2; done
sleep 3

res=$(curl 'http://localhost:8080/graphql' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36' \
  -H 'content-type: application/json' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
  --data-raw '{"query":"\n      query GetQueues {\n        queues {\n          name\n          isPaused\n          jobsCounts {\n            waiting\n            active\n            completed\n            failed\n            delayed\n            paused\n          }\n        }\n      }\n    "}')
  
echo $res

docker stop test
docker rm test

if [ "$res" == *"data"* ]; then
  echo "It's there!"
fi
