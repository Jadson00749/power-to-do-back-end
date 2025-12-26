FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  make \
  g++
RUN npm install
COPY tsconfig.json ./
COPY . ./
RUN npm run build
FROM node:18
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package*.json /app/
COPY .env .env
RUN npm install --production
EXPOSE 4099
CMD ["npm", "run", "start:prod"]
