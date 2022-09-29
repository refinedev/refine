FROM node:16-alpine

WORKDIR /opt/app

ENV NODE_ENV development

COPY package*.json ./

RUN npm install --force

COPY . /opt/app

RUN npm run bootstrap
RUN npm run build

#Example client
WORKDIR /opt/app/packages/live-previews

CMD npm run start:prod
