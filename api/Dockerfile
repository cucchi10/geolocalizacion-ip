FROM node:16-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . .

# Agregue la descarga de wait-for-it.sh
RUN apk add --no-cache bash
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x wait-for-it.sh

# Cambie su comando start para que use wait-for-it.sh antes de ejecutar sequelize y nodemon
CMD ["bash", "-c", "./wait-for-it.sh db:${DB_PORT} -t 30 -- npx sequelize-cli db:migrate && nodemon server.js"]