FROM node:12-alpine

WORKDIR /opt/app

ENV NODE_ENV production

COPY package*.json ./

RUN npm install --dev 

COPY . /opt/app

RUN npm run build

#Example 
WORKDIR /opt/app/example

RUN npm install --dev 

CMD [ "npm", "run", "serve" ]
