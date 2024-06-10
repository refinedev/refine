---
title: Multitenancy
---

Refine's architecture allows you to customize your app's data providers, access control and routing to support multi tenant features easily. This guide will provide you with a high level overview of the concepts and how to implement them. To see multi tenant app examples, check out the [Examples](#examples) section.

## What is Multitenancy?

Multitenancy refers to a kind of architecture where a single instance of software runs on a server and serves multiple customers. In a multi-tenant environment, separate customers tap into the same hardware and data storage, creating a dedicated instance for each customer. Each tenant’s data is isolated and remains invisible to others, but is running on the same server.

## Implementing Multitenancy in Refine

While there are many ways to implement multi tenant features, we'll implement a route based approach in the following sections. While your m implementation may differ, the concepts will be similar and the approach will be tweakable to your needs.

### Configuring Multi-tenant Routes

We'll be using routes to determine which tenant is being accessed. To do this, we'll need to configure our routes to include the tenant information. For example, a `products` resource will have the route definition for `list` as `/:tenantId/products`.

In the examples below, we are only showing the route definitions. You may need additional code to implement styling and layout depending on your choice of UI library. Regardless of the UI library you choose, the routing implementation will be similar to the examples above.

<Tabs wrapContent={false}>

<TabItem value="React Router Dom">

import ReactRouterRouteDefinitions from "./examples/react-router.tsx";

<ReactRouterRouteDefinitions />

</TabItem>

<TabItem value="Next.js">

import NextjsRouteDefinitions from "./examples/nextjs.tsx";

<NextjsRouteDefinitions />

</TabItem>

<TabItem value="Remix">

import RemixRouteDefinitions from "./examples/remix.tsx";

<RemixRouteDefinitions />

</TabItem>

</Tabs>

### Handling Multi-tenant Requests in Data Providers

We'll be using the `tenantId` from the route to determine which tenant is being accessed. Refine will infer the `tenantId` from the current route and pass it to the data provider in `meta`. You can access the `tenantId` from the `meta` object in your data provider and use it in your API calls.

To customize the data providers, you can override each method in the data provider instance or use the `swizzle` command to be fully able to customize the data provider for your needs.

An example implementation of a custom `getList` method is shown below.

```ts
import dataProvider from "@refinedev/simple-rest";

const API_URL = "<API_URL>";
const baseDataProvider = dataProvider(API_URL);

const customDataProvider = {
  ...baseDataProvider,
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const { tenantId } = meta;

    // We're prefixing the tenantId to the resource name
    // Your API may have a different way of handling this
    const response = await fetch(
      `${API_URL}/${tenantId}/${resource}?${stringify({
        /* ... */
      })}`,
    );

    const data = await response.json();

    const total = parseInt(response.headers.get("x-total-count") || "0");

    return { data, total };
  },
};
```

:::simple Implementation Tips

Check out the [Examples](#examples) below to see a full implementation of a data provider for a multi tenant app.

:::

### Adding a Tenant Selector to the UI

Now we've defined our routes and data providers to use `tenantId` to determine which tenant is being accessed. We'll need to add a tenant selector to the UI to allow users to switch between tenants.

:::simple Implementation Tips

- The implementation of the component may differ depending on your choice of UI library. Regardless of the UI library you choose, the implementation will be similar to the example below.

- It's best to place the tenant selector in a layout component that wraps the routes. This way, the tenant selector will be available in all pages. If you're using Refine's layout components, it's recommended to place the tenant selector in the header or sider components.

- Check out the [Examples](#examples) below to see an example implementation of a tenant selector.

:::

import Selector from "./examples/selector.tsx";

<Selector />

## Examples

Here is the example of multi tenant app built with Refine. You can view the source code and run the apps in your local to understand how multi tenant features are implemented.

### Strapi

<CodeSandboxExample hideSandbox path="multi-tenancy-strapi" />
