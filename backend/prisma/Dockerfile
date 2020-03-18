FROM node:latest

RUN npm install -g --unsafe-perm prisma2

WORKDIR /app

COPY ./ ./prisma

# RUN prisma2 migrate save --name "init" --experimental

# RUN prisma2 migrate up --experimental

CMD ["prisma2", "studio", "--experimental"]