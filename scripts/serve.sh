#!/usr/bin/env bash

set -e

script_folder=`cd $(dirname $0) && pwd`

# load .env variables if they exist
if [ -f .env ]
then
  set -o allexport
  source .env
  set +o allexport
fi

# build react app
cd $script_folder/../www \
  && npm run build

# build firebase functions
cd $script_folder/../functions \
  && npm run build

# check environment variables are defined
if [ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]
then
  echo "WARNING: GOOGLE_APPLICATION_CREDENTIALS environment variable is empty."
else
  if [ ! -f "$GOOGLE_APPLICATION_CREDENTIALS" ]
  then
    echo "WARNING: $GOOGLE_APPLICATION_CREDENTIALS does not exist."
  fi
fi

if [ -z "$GOOGLE_PAY_ISSUER_ID" ]
then
  echo "WARNING: GOOGLE_PAY_ISSUER_ID environment variable is empty."
fi

if [ -z "$LOYALTY_WEBSITE" ]
then
  echo "WARNING: LOYALTY_WEBSITE environment variable is empty."
fi

firebase serve
