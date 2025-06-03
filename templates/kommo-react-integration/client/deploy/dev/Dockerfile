FROM node:20-alpine AS build

ARG ENVIRONMENT

RUN apk add --no-cache

RUN mkdir /opt/app
WORKDIR /opt/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY ./public ./public

RUN mkdir /tmp/widget
RUN cp -r ./public/* /tmp/widget

ENV ENVIRONMENT=$ENVIRONMENT

CMD ["npm", "run", "dev"]
