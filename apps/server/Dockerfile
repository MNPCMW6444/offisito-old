FROM node:lts as builder
WORKDIR /app
COPY package*.json nx.json ./
COPY libs/ libs/
COPY apps/server/ apps/server/
RUN npm ci
RUN npx nx build server

FROM node:lts-slim
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "dist/apps/server/main.js"]
EXPOSE 6025

