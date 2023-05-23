FROM node:lts-alpine

WORKDIR /usr/src/app

COPY server/package*.json ./

RUN npm ci

COPY server ./

CMD ["npm", "run", "start"]