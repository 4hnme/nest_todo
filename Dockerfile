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
# RUN npm ci --omit=dev

FROM node:24.14-alpine AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
