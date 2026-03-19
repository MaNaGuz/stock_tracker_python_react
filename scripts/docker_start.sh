#!/usr/bin/bash

PORT=$1

docker run --name my_store store

echo "Stopping Container"
docker rm -f my_store
