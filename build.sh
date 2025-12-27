#!/bin/bash

## Build da Imagem
docker build -t nest-apis-v2 .

## Parar e remover container anterior (se existir)
docker stop nest-apis-backend 2>/dev/null || true
docker rm nest-apis-backend 2>/dev/null || true

## Criar container com variáveis de ambiente
docker run -d \
  --name nest-apis-backend \
  -p 4099:4099 \
  -e DB_HOST=${DB_HOST} \
  -e DB_PORT=${DB_PORT} \
  -e DB_USERNAME=${DB_USERNAME} \
  -e DB_NAME=${DB_NAME} \
  -e DB_PASSWORD=${DB_PASSWORD} \
  -e JWT_KEY=${JWT_KEY} \
  -e LOCAL_SERVER=${LOCAL_SERVER} \
  nest-apis-v2

echo "Container nest-apis-backend iniciado com sucesso!"
echo "Logs: docker logs -f nest-apis-backend"
