FROM node:16.15.0

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY . .

EXPOSE 3001

RUN npm install -y && apt update && apt install net-tools nano -y

CMD npm start
