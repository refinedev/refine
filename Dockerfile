FROM node:12-alpine

WORKDIR /opt/app

ENV NODE_ENV production

COPY package*.json ./

RUN npm install --dev 

COPY . /opt/app

RUN npm run build

#Example 
WORKDIR /opt/app/example2

RUN npm install --dev 

RUN npm run build


FROM node:12-alpine

COPY --from=0 /opt/app/example2/build /opt/app
WORKDIR /opt/app/

ENV NODE_ENV=production

RUN npm install -g http-server

CMD http-server -p 5000
