FROM node:18-alpine

WORKDIR /opt/app

RUN apk add git openssh-client

ENV NODE_ENV development

COPY package*.json ./
COPY .npmrc ./

RUN npm ci

COPY . /opt/app

RUN npm run bootstrap:all
RUN npm run build:all

WORKDIR /opt/app/documentation

RUN npm ci

ENV LIVE_PREVIEW_URL=https://next.live-previews.refine.dev/preview

RUN npm run build

FROM node:18-alpine

COPY --from=0 /opt/app/documentation/build /opt/app
WORKDIR /opt/app/

ENV NODE_ENV=production

RUN npm install -g serve

CMD serve -l 80
