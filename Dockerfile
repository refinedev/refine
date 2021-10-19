FROM node:14-alpine

WORKDIR /opt/app

ENV NODE_ENV development

COPY package*.json ./

RUN npm install

COPY . /opt/app

RUN npm run bootstrap
RUN npm run build

FROM node:14-alpine

COPY --from=0 /opt/app/examples/fineFoods/build /opt/app
WORKDIR /opt/app/

ENV NODE_ENV=production

RUN npm install -g serve

CMD serve -l 5000
