FROM node:lts as BUILDER
WORKDIR /app
COPY package*.json nx.json ./
COPY libs/ libs/
COPY src /app/src
RUN npm ci
COPY apps/server/ apps/server/
RUN nx build server

FROM node:lts-slim
WORKDIR /app
COPY --from=build /app .
CMD ["node", "apps/server/dist/main.js"]
EXPOSE 6025

