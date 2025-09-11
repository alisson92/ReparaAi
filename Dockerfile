# Dockerfile

FROM node:18-alpine

WORKDIR /usr/src/app

# Copia primeiro os arquivos de dependência para otimizar o cache
COPY package*.json ./

# Instala TODAS as dependências listadas no package.json
RUN npm install

# Copia o resto do código
COPY . .

# Expõe a porta correta que você usa no docker-compose
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]