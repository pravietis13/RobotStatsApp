FROM node:25.0-alpine AS build
WORKDIR /app

COPY package* /app
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.29-alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]