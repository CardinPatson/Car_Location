FROM node:16.15.0

RUN apt update && apt upgrade -y && \
    apt install -y net-tools nano

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY . .

EXPOSE 3001

RUN npm install && sequelize db:create && sequelize db:migrate