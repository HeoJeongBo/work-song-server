#!/bin/sh

# 안전한 .env 로딩
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "Using DB_USER=$DB_USER DB_NAME=$DB_NAME DB_PORT=$DB_PORT"

# 기존 컨테이너 제거
if [ "$(docker ps -aq -f name=worksongpostgres)" ]; then
    echo "Stopping and removing existing worksongpostgres container..."
    docker stop worksongpostgres
    docker rm worksongpostgres
fi

# 기존 볼륨 제거 (옵션)
if [ "$(docker volume ls -q -f name=postgres-data)" ]; then
    echo "Removing existing volume..."
    docker volume rm postgres-data
fi

# 빌드 및 실행
docker build -t worksongpostgres -f ./db.Dockerfile .

docker run -d --name worksongpostgres \
  -e POSTGRES_USER=$DB_USER \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_DB=$DB_NAME \
  -p $DB_PORT:5432 \
  -v postgres-data:/var/lib/postgresql/data \
  worksongpostgres

echo "Postgres Container is running on port $DB_PORT..."