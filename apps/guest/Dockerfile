FROM node:lts as builder
WORKDIR /app
COPY package*.json nx.json tsconfig.base.json ./
COPY libs/ libs/
COPY apps/guest/ apps/guest/
RUN npm i
RUN npx nx build guest
RUN npm run build:guest

FROM node:lts-slim
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "dist/apps/guest/server.js"]
EXPOSE 6025

