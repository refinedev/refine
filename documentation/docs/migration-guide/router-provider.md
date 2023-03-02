---
id: router-provider
title: Migrating Router Provider from 3.x.x to 4.x.x
sidebar_label: Migrating Router Provider
---

## Motivation behind the changes

Our motivation behind the changes in `routerProvider` and route handling is to make it flexible and easy to use for our users. By reducing our `routerProvider` definition to an interaction and connection point between **refine** and the router, we've get rid of the requirement for a `routerProvider` and the need to follow a specific way of defining routes. This will allow you to use any router you want with **refine**. Providing router bindings are all optional but we recommend passing them to **refine** to get most out of it.

This change will also allow our users to adopt **refine** in their existing projects without having to change their existing routes and the structure of their application.

In the end, we want to make it easy for our users to handle their use cases and not force them to follow a specific way of doing things. With the new router provider, you will be able to use routers the way you used to without compromising on the features **refine** provides.

## Important Notes

In the new router provider, we're not handling the authentication checks by the routes. If your app uses `authProvider` you'll need to handle those checks yourself. It will be easy to do so by using the `useIsAuthenticated` hook or the `Authenticated` components. Example implementations are present in the documentation (Check below for more info on each router) and in the example apps. 

The control of the routes and the route creation is left to the user. You'll need to create the routes manually and if you like, you can pass the routes to actions of your resources. Although we provide ways to create routes by your resources, which you can check out in the router you choose below. Route creation by resources is optional and not recommended for flexibility but it's there if you want to use it.


## Using the New Router Providers

We've created documents for each router we provide bindings for. You can check them out below:

### React Router v6

When using `react-router-dom` and `@pankod/refine-react-router-v6`, you'll need to create your routes using `Routes`, `Route`, etc. and wrap the `<Refine>` component with the router you pick (e.g. `<BrowserRouter>`). Then, you can pass the `routerProvider` to the `<Refine>` component from `@pankod/refine-react-router-v4` and you can define your resource action path in the `resources` array. Our documentation will guide you through the process of creating routes and binding them to your resources with examples.

[Check out the documentation for `@pankod/refine-react-router-v6`](docs/packages/documentation/routers/react-router-v6/)
[Check out the documentation for `react-router-dom`](https://reactrouter.com)

### Next.js

When using Next.js, you'll need to create your routes the same way you used to in Next.js, by the file system based routing. Then, you can pass the `routerProvider` to the `<Refine>` component from `@pankod/refine-nextjs-router` and you can define your resource action path in the `resources` array. Our documentation will guide you through the process of creating routes and binding them to your resources with examples.

[Check out the documentation for `@pankod/refine-nextjs-router`](docs/packages/documentation/routers/nextjs/)
[Check out the documentation for `Next.js`](https://nextjs.org/docs/getting-started)

### Remix

When using Remix, you'll need to create your routes the same way you used to in Remix, by the file system based routing. Then, you can pass the `routerProvider` to the `<Refine>` component from `@pankod/refine-remix-router` and you can define your resource action path in the `resources` array. Our documentation will guide you through the process of creating routes and binding them to your resources with examples.

[Check out the documentation for `@pankod/refine-remix-router`](docs/packages/documentation/routers/remix/)
[Check out the documentation for `Remix`](https://remix.run/docs/en/main)
