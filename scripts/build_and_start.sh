#!/bin/sh

# set -euo pipefail
#set -e

WD="$(cd "." && pwd)"
cd $WD

docker-compose up --build

echo "Stopping Container"