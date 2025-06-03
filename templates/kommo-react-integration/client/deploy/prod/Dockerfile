FROM node:20-alpine AS build

ARG ENVIRONMENT

RUN apk add --no-cache zip

RUN mkdir /opt/app
WORKDIR /opt/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

RUN ENVIRONMENT=${ENVIRONMENT} npm run prod

CMD ["sh"]
