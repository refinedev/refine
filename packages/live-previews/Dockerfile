FROM node:16-alpine

WORKDIR /opt/app

RUN apk add git openssh-client

COPY . /opt/app
ENV NODE_ENV development

RUN npm ci

RUN npm run bootstrap
RUN npm run build

#Example client
WORKDIR /opt/app/packages/live-previews

CMD npm run start:prod
