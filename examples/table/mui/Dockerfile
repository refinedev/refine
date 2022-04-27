FROM node:16-alpine

WORKDIR /opt/app

ENV NODE_ENV development

COPY package*.json ./

RUN npm install

COPY . /opt/app

RUN npm run bootstrap -- --scope refine-mui-base-example -- --force
RUN npm run build -- --scope refine-mui-base-example

FROM node:16-alpine

COPY --from=0 /opt/app/examples/base/build /opt/app
WORKDIR /opt/app/

ENV NODE_ENV=production

RUN npm install -g serve

CMD serve -l 5000
