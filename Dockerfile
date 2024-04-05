# Dockerfile.base
FROM node:lts as base
WORKDIR /app
COPY package.json ./
RUN npm i
