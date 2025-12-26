## Imagem
docker build -t nest-apis-v2 .

## Container
nest-apis-backend-1

# Recriar container
docker run -d --name nest-apis-backend -p 4099:4099 nest-apis-v2

#remover container
docker rm <id_container>
