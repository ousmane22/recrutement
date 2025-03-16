FROM node:lts-alpine AS build

RUN node -v && npm -v

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build 

FROM nginx:alpine

COPY --from=build /app/dist/auth.front/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
