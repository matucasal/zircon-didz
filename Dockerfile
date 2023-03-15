########################
# Build Base
########################
FROM node:16-alpine3.16 AS base 
WORKDIR /app
COPY ./package.json /app/


RUN npm install
COPY . /app/

########################
# Run Develop
########################
FROM base AS development
ENV NODE_ENV=development


USER node

EXPOSE 3001
CMD ["npm", "run", "start:dev"]

########################
# Tests runner
########################
FROM base AS test
ENV NODE_ENV=test

WORKDIR /app
COPY ./package.json ./package-lock.json /app/


RUN npm install
COPY . /app/

RUN npm run test

########################
# API Build
########################
FROM base AS build

WORKDIR /app
COPY ./package.json ./package-lock.json /app/

RUN npm install
COPY . /app/

RUN npm run build

########################
# Run Production
########################
FROM node:16-alpine3.16 AS production
ENV NODE_ENV=production

WORKDIR /app
COPY ./package.json ./package-lock.json /app/

RUN npm install --production
COPY --from=build /app/dist ./dist


EXPOSE 3001
CMD ["npm", "run", "start:prod"]
