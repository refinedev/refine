FROM node:18-alpine

WORKDIR /opt/app

RUN apk add git openssh-client

ENV NODE_ENV development

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY . /opt/app

RUN npm run bootstrap -- --scope finefoods-client
RUN npm run build -- --scope finefoods-client

#Example client
WORKDIR /opt/app/examples/finefoods-client

CMD npm run start:prod
