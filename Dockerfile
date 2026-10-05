FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_API_BASE_URL
ARG VITE_MEDIA_URL
ARG VITE_COUNTRY_CODE

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_MEDIA_URL=$VITE_MEDIA_URL
ENV VITE_COUNTRY_CODE=$VITE_COUNTRY_CODE

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html
COPY ./nginx/conf.d/cms.conf /etc/nginx/conf.d/cms.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
