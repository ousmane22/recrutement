FROM node:lts-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/entretien/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
