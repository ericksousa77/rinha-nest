FROM node:18.17.1-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o código-fonte da aplicação para o diretório de trabalho
COPY . .

# # Builda a aplicaçao
# RUN npx prisma migrate deploy && npm run build

# Comando para iniciar a aplicação
CMD npm run db:prisma:generate && npm run db:prisma:migrate:deploy && npm run build && npm run start:prod