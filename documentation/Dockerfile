FROM node:14-alpine

WORKDIR /opt/app

ENV NODE_ENV production

COPY package*.json ./

RUN npm install

COPY . /opt/app

RUN npm run build

CMD npm run serve -- --build --port 80 --host 0.0.0.0

