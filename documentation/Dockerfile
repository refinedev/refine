FROM node:16-alpine

WORKDIR /opt/app

RUN apk add git openssh-client

ENV NODE_ENV production

COPY package*.json ./

RUN npm install

COPY . /opt/app

RUN npm run build

FROM node:16-alpine

COPY --from=0 /opt/app/build /opt/app
WORKDIR /opt/app/

ENV NODE_ENV=production

RUN npm install -g serve

CMD serve -l 80
