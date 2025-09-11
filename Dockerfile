FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências (inclui devDependencies, já que é ambiente de dev)
RUN npm install

# Copiar todo o código da aplicação
COPY . .

# Expor a porta que o backend usa
EXPOSE 3000

# Comando padrão (rodar em modo dev com hot reload)
CMD ["npm", "run", "dev"]
