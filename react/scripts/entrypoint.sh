#!/bin/sh

set -e

envsubst '$BACKEND_URL' \
   < /etc/nginx/templates/default.conf.template \
   > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;' #exec runs nginx as principal process, not as child of sh