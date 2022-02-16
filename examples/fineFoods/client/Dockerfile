FROM node:16-alpine

WORKDIR /opt/app

ENV NODE_ENV development

COPY package*.json ./

RUN npm install

COPY . /opt/app

RUN npm run bootstrap -- --scope fine-foods-client
RUN npm run build -- --scope fine-foods-client

#Example client
WORKDIR /opt/app/examples/fineFoods/client

CMD npm run start:prod
