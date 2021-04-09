---
id: reverse-proxy
title: Reverse Proxy
sidebar_label: Reverse Proxy
description: How to use Reverse Proxy in Next.js apps?
---

A proxy server sits between or intermediary server that forwards requests for content from multiple clients to different servers across the Internet. A reverse proxy server is a type of proxy server that typically sits behind the firewall in a private network and directs client requests to the appropriate backend server.

A reverse proxy provides an additional level of abstraction and control to ensure the smooth flow of network traffic between clients and servers.

You can define the paths you want to implement reverse proxy in `next.config.js`

```js title="next.config.js"
const withPlugins = require("next-compose-plugins");

const config = {
  devServer: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};

module.exports = withPlugins([], config);
```