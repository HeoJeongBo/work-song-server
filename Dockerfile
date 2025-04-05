# 베이스 이미지 설정
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn*.lock ./

RUN yarn install

COPY . .

COPY prisma ./prisma

RUN npx prisma generate

RUN yarn build

RUN apk add --no-cache bash curl

RUN curl -s https://raw.githubusercontent.com/eficode/wait-for/v2.1.3/wait-for -o /usr/local/bin/wait-for
RUN chmod +x /usr/local/bin/wait-for

CMD ["sh", "-c", "/usr/local/bin/wait-for postgres:5432 -- npx prisma migrate deploy && yarn start:prod"]
