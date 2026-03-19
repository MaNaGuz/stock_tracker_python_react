#!/bin/sh

# set -euo pipefail
#set -e

WD="$(cd "." && pwd)"
cd $WD

docker build -t store -f Dockerfile .

echo "Image built"

PORT=$1

docker run -v $WD/data:/opt/store/data --name my_store store

echo "Stopping Container"
docker rm -f my_store
