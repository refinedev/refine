---
id: router-provider
title: Migrating Router Provider from 3.x.x to 4.x.x
sidebar_label: Migrating Router Provider
---

## Motivation behind the changes

Our motivation behind the changes in `routerProvider` and route handling is to increase flexibility and ease of use for our users.

By simplifying the `routerProvider` to just an interaction and connection point between refine and the router, we eliminated the need for a specific way of defining routes and a `routerProvider` altogether. This means that any router can now be used with **refine**. While router bindings are optional, we recommend passing them to **refine** for optimal usage.

By making these changes, our users can integrate **refine** into their existing projects without needing to modify their current routes or application structure.

Ultimately, our goal is to make it simple for users to handle their unique situations without enforcing a particular methodology. With the updated router provider, you can continue using routers in the same way as before, while still benefiting from the features that **refine** offers.

## Important Notes

With the new router provider, authentication checks are not handled by the routes. If your application utilizes `authProvider`, you will be responsible for performing those checks yourself. You can easily do so by employing the `useIsAuthenticated` hook or the `Authenticated` component. Example implementations are present in the documentation ([Check below](#using-the-new-router-providers) for more info on each router) and in the example apps. 

The creation and control of routes is entirely up to the user. You must manually create routes, and if desired, you can pass the routes to actions of your resources. Although we provide methods for generating routes from resources, these methods are optional and not recommended for optimal flexibility. However, they are available under each router if you choose to use them.

## Using the New Router Providers

We've created documents for each router we provide bindings for. You can check them out below:

### React Router v6

If you are using `react-router-dom` and `@pankod/refine-react-router-v6`, you will need to generate your routes using `Routes`, `Route`, `Outlet` and similar components, and then wrap the `<Refine>` component with your chosen router (e.g. `<BrowserRouter>`). Afterwards, you may pass the routerProvider to the `<Refine>` component from `@pankod/refine-react-router-v6`, and specify the paths for your resource actions in the `resources` array. Our documentation provides detailed instructions on how to create routes, associate them with your resources, and includes examples for reference.

[Check out the documentation for `@pankod/refine-react-router-v6`](#)
[Check out the documentation for `react-router-dom`](https://reactrouter.com)

### Next.js

If you are using Next.js, you will need to create your routes using the file system-based routing method as you would normally do in Next.js. Afterwards, you can pass the `routerProvider` from `@pankod/refine-nextjs-router` to the `<Refine>` component, and specify the paths for your resource actions in the resources array. Our documentation provides step-by-step instructions on how to create routes and associate them with your resources, complete with examples for your reference.

[Check out the documentation for `@pankod/refine-nextjs-router`](#)
[Check out the documentation for `Next.js`](https://nextjs.org/docs/getting-started)

### Remix

If you are using Remix, you will need to create your routes using the file system-based routing method as you would normally do in Remix. Afterwards, you can pass the `routerProvider` from `@pankod/refine-remix-router` to the `<Refine>` component, and specify the paths for your resource actions in the `resources` array. Our documentation provides comprehensive instructions on how to create routes and associate them with your resources, along with examples to guide you through the process.

[Check out the documentation for `@pankod/refine-remix-router`](#)
[Check out the documentation for `Remix`](https://remix.run/docs/en/main)
