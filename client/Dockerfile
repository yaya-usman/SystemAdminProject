FROM node:lts-alpine as builder
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

#using nginx to host our production static files built from the client
FROM nginx
EXPOSE 3000
COPY ./client/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html