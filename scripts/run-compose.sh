#!/bin/sh

SCRIPT_PATH=$(realpath "$0")

SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

cd "$SCRIPT_DIR"

echo "Building and running Docker containers..."

docker-compose up --build -d

echo "Cleaning up unused Docker containers..."

UNUSED_CONTAINERS=$(docker ps -aq --filter "status=exited")

if [ ! -z "$UNUSED_CONTAINERS" ]; then
    docker rm $UNUSED_CONTAINERS
fi


echo "Application is running. Access it at http://localhost:3000"