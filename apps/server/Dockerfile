FROM node:lts as builder
WORKDIR /app
COPY package*.json nx.json ./
COPY libs/ libs/
COPY src /app/src
RUN npm ci
COPY apps/server/ apps/server/
RUN nx build server

FROM node:lts-slim
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "apps/server/dist/main.js"]
EXPOSE 6025

