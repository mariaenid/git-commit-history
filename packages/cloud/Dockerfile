FROM docker.io/node:lts-alpine as builder

RUN apk add --no-cache python3 make g++

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npm install -g npm@9.6.6
RUN npm i nx
RUN npm run build:prod ${BUILD_FLAG}

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/builder/dist/packages/cloud ./
COPY --from=builder /app/builder/packages/cloud/tools/nginx.conf /etc/nginx/nginx.conf