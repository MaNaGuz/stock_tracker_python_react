#!/bin/sh

set -e

WD="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
cd $WD

export PYTHONPATH="../lib:../py:$PYTHONPATH"

nginx

python3 -m store.app
