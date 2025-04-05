#!/bin/sh

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "Using DB_USER=$DB_USER DB_NAME=$DB_NAME DB_PORT=$DB_PORT"

if [ "$(docker ps -aq -f name=worksongpostgres)" ]; then
    echo "Stopping and removing existing worksongpostgres container..."
    docker stop worksongpostgres
    docker rm worksongpostgres
fi

if [ "$(docker volume ls -q -f name=postgres-data)" ]; then
    echo "Removing existing volume..."
    docker volume rm postgres-data
fi

docker build -t worksongpostgres -f ./db.Dockerfile .

docker run -d --name postgres \
  -e POSTGRES_USER=$DB_USER \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_DB=$DB_NAME \
  -p $DB_PORT:5432 \
  -v postgres-data:/var/lib/postgresql/data \
  worksongpostgres

echo "Postgres Container is running on port $DB_PORT..."