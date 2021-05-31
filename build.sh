#!/bin/sh -x
set -e

docker build -t bull-monitor .
docker tag bull-monitor samuraitruong/bull-monitor
docker push samuraitruong/bull-monitor
