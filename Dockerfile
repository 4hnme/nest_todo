FROM node:24.14-alpine AS development
WORKDIR /usr/src/app
COPY *.json ./
RUN npm ci

FROM node:24.14-alpine AS build
WORKDIR /usr/src/app
COPY *.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24.14-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY ./docker-entrypoint.sh .
CMD ["sh", "docker-entrypoint.sh"]
EXPOSE 3000
