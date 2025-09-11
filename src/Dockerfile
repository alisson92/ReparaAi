# Usar uma imagem oficial do Node.js — versão LTS
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json primeiro para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install --production

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta que o backend usa (mude se for diferente)
EXPOSE 3000

# Definir variáveis ambiente padrão (se quiser)
ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["npm", "start"]
