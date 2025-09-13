# ReparaAi/frontend/Dockerfile

# 1. Usar uma imagem Node moderna e leve, compatível com o Vite
FROM node:20-alpine

# 2. Definir o diretório de trabalho
WORKDIR /usr/src/app

# 3. Copiar os arquivos de dependência e instalar (otimizando o cache)
COPY package*.json ./
RUN npm install

# 4. Copiar o restante do código-fonte do frontend
COPY . .

# 5. Expor a porta padrão do Vite para comunicação interna do Docker
EXPOSE 5173

# 6. Comando para iniciar o servidor de desenvolvimento do Vite
# O '--host' é importante para que o servidor seja acessível de fora do contêiner
CMD [ "npm", "run", "dev", "--", "--host" ]
