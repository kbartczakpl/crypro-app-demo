#Prepare Applicationdoc
FROM node:16-alpine as build-step
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# Serve Application using Nginx Server
FROM nginx:1.19
COPY --from=build-step /app/dist/crypro-app-demo /usr/share/nginx/html
COPY ./docker/nginx-custom.conf /etc/nginx/conf.d/default.conf
