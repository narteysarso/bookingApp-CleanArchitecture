FROM node:latest

RUN openssl version -v

RUN npm install -g --unsafe-perm prisma2

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY ./ ./

RUN prisma2 generate


CMD ["npm","run","start"]