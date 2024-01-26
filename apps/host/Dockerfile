FROM node:lts as builder
WORKDIR /app
COPY package*.json nx.json tsconfig.base.json ./
COPY libs/ libs/
COPY apps/host/ apps/host/
RUN npm i
RUN npx nx build assets
RUN npm run build:assets

FROM node:lts-slim
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "dist/apps/host/server.js"]
EXPOSE 4200

