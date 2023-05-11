FROM docker.io/node:lts-alpine as builder

RUN apk add --no-cache python3 make g++

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder

COPY . .

RUN npm install
