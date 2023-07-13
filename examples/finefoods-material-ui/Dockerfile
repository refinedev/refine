FROM node:18-alpine

WORKDIR /opt/app

RUN apk add git openssh-client

ENV NODE_ENV development

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY . /opt/app

RUN npm run bootstrap -- --scope finefoods-material-ui -- --force
RUN npm run build -- --scope finefoods-material-ui

FROM node:18-alpine

COPY --from=0 /opt/app/examples/finefoods-material-ui/dist /opt/app
WORKDIR /opt/app/

ENV NODE_ENV=production

RUN npm install -g serve

CMD serve -l 5000