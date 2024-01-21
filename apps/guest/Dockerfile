FROM node:lts as builder
WORKDIR /app
COPY package*.json nx.json tsconfig.base.json ./
COPY libs/ libs/
COPY apps/guest/ apps/guest/
RUN npm ci
RUN npx nx build guest

FROM node:lts-slim
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "dist/apps/server/main.js"]
EXPOSE 6025

