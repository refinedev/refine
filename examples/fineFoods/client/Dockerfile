FROM node:14-alpine

WORKDIR /opt/app

ENV NODE_ENV development

COPY package*.json ./

RUN npm install

COPY . /opt/app

RUN npm run bootstrap
RUN npm run build

#Example client
WORKDIR /opt/app/examples/fineFoods/client

CMD npm run start:prod
