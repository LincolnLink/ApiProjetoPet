# ApiProjetoPet

 - Comando que cria a imagem usando dockerfile e o docker-compose

 docker build -t apipet -f src/Pet.Api/Dockerfile .

 - Lista a imagem

 docker images

 - Comando que cria o container

 docker run -d -p 8080:8080 --name apipet-container apipet

 - Lista os comtainer

docker ps

 - lista os container mesmo parado 

docker ps -a

 - Inicia o container

docker start -a <nome-do-container>

 - comando para executar backend e frontend

docker-compose up pet.frontend.dev
docker-compose up -d pet.api










