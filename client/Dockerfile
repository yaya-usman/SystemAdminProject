FROM node:lts-alpine as builder
WORKDIR /usr/src/app
COPY client/package*.json ./
RUN npm ci
COPY client ./
RUN npm run build

#using nginx to host our production static files built from the client
FROM nginx
EXPOSE 3000
COPY client/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html