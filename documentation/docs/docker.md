---
id: docker
title: Docker
sidebar_label: Docker
description: How to use NextJS with docker?
---

Docker is an open source containerization platform. Docker enables developers to package applications into containers—standardized executable components that combine application source code with all the operating system (OS) libraries and dependencies required to run the code in any environment.

[Refer to official documentation for detailed usage. &#8594](https://docs.docker.com)

Example Dockerfile:

```js title="Dockerfile"
FROM node:12-alpine

WORKDIR /opt/app

ENV NODE_ENV production

COPY package*.json ./

RUN npm ci 

COPY . /opt/app

RUN npm install --dev && npm run build

CMD [ "npm", "start" ]
```

:::note

Dockerfile is created by superplate if you select docker plugin during the project creation phase.

:::
