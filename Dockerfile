FROM node:14-alpine

WORKDIR /opt/app

ENV NODE_ENV development

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . /opt/app

#Example 
WORKDIR /opt/app/example-parcel

RUN yarn install

RUN npm run build

FROM node:14-alpine

COPY --from=0 /opt/app/example/build /opt/app
WORKDIR /opt/app/

ENV NODE_ENV=production

RUN npm install -g serve

CMD serve -l 5000
