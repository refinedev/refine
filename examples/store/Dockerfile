FROM node:18-alpine

WORKDIR /opt/app

RUN apk add git openssh-client

ENV NODE_ENV development

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY . /opt/app

RUN npm run bootstrap -- --scope store
RUN npm run build -- --scope store

#Example client
WORKDIR /opt/app/examples/store

CMD npm run start:prod
