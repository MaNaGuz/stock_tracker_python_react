#!/bin/sh

set -e

WD="$(cd "." && pwd)"
cd $WD

docker build -t store -f ../Dockerfile ..
