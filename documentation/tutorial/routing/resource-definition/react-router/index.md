---
title: Defining Resources
---

import { Sandpack, AddRoutesToApp, AddResourcesToApp } from "./sandpack.tsx";

<Sandpack>

So far, we've created components to interact with our data. In this step, we'll be creating routes for these components and define our resources to inform Refine about their corresponding routes.

To learn more about the Resource concept, refer to the [Resource Concept](/docs/guides-concepts/general-concepts/#resource-concept) section in the General Concepts guide.

## Creating Routes

We've wrapped our app with the `<BrowserRouter />` component in the previous step. Now, we'll be creating routes for our components with the `<Route />` and `<Routes />` components.

We'll use the following routes to place our components:

- `/products` - `<ListProducts />`
- `/products/:id` - `<ShowProduct />`
- `/products/:id/edit` - `<EditProduct />`
- `/products/create` - `<CreateProduct />`

Try to add the following code to your `src/App.tsx` file:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";

// highlight-next-line
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

import { Login } from "./login";
import { Header } from "./header";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
      >
        {/* highlight-start */}
        <Routes>
          <Route path="/products">
            <Route index element={<ListProducts />} />
            <Route path=":id" element={<ShowProduct />} />
            <Route path=":id/edit" element={<EditProduct />} />
            <Route path="create" element={<CreateProduct />} />
          </Route>
        </Routes>
        {/* highlight-end */}
      </Refine>
    </BrowserRouter>
  );
}
```

<AddRoutesToApp />

:::info

Notice that we're currently not using the `<Login />`, `<Header />` and `<Authenticated />` components. We'll update our routes to use these components in the next steps.

:::

## Defining Resources

Now we've created our routes, it's time to define our resources. This will allow Refine to know about our resources and treat them accordingly.

While defining the resources and assigning appropriate routes to actions is optional, it's highly recommended to do so to benefit from the features provided by Refine.

By defining our resources, we'll be unlocking the following features:

- Inferring the related parameters from the routes without the need to pass them explicitly.
- Handling redirections automatically and handling navigations between these routes easily.
- Easily creating menus and breadcrumbs for our resources.
- Ability to pass `meta` values to every data hook per resource from a single place.
- Easily managing features like access control, i18n, and more.

We'll be using the [`resources`](/docs/core/refine-component/#resources) prop of the `<Refine />` component to define our resources.

A resource definition consists of the following properties:

- `name`: The name of the resource. This will be passed to the data provider's methods to identify the resource.
- `identifier`: An optional identifier for the resource. If not provided, `name` will be used as the identifier. This is useful when you want to use the same resource for the data provider but have a different configuration on Refine's side.
- `list`, `'create`, `edit` and `show`: These properties are used to define the routes for the corresponding actions. They will be the string values of the routes we've created in the previous step.
- `meta`: An optional object to pass meta values per resource. This is widely used in Refine's hooks and components for various purposes from data fetching, access control, i18n to UI customization.

Try to add the following code to your `src/App.tsx` file:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

import { Login } from "./login";
import { Header } from "./header";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
        // highlight-start
        resources={[
          {
            name: "protected-products",
            list: "/products",
            show: "/products/:id",
            edit: "/products/:id/edit",
            create: "/products/create",
            meta: { label: "Products" },
          },
        ]}
        // highlight-end
      >
        <Routes>
          <Route path="/products">
            <Route index element={<ListProducts />} />
            <Route path=":id" element={<ShowProduct />} />
            <Route path=":id/edit" element={<EditProduct />} />
            <Route path="create" element={<CreateProduct />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
```

<AddResourcesToApp />

Now we've defined our routes and resources, in the next step, we'll be updating our route components to handle authentication and layouts.

</Sandpack>
