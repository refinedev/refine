---
title: Authentication
---

import { Sandpack, AddAuthenticationToApp } from "./sandpack.tsx";

<Sandpack>

In this step, we'll be updating our routes to handle authentication by using the `<Authenticated />` component and the `<NavigateToResource />` component to redirect users to our main `products` resource.

## `<Authenticated />` and Routing

In the previous unit, we've implemented our authentication system and protected our content from unauthenticated users by using the `<Authenticated />` component.

We've used the `children` and `fallback` props of the `<Authenticated />` component to render our content or the fallback component based on the authentication status.

Now we'll be leveraging these props to handle which routes to render based on the authentication status and handle redirects for the opposite cases.

`<Authenticated />` component works seamlessly with the router provider if we omit the `fallback` prop and use `redirectOnFail` prop. In this case, it will redirect the user to the login page if they are not authenticated.

```tsx
import { Authenticated } from "@refinedev/core";

const MyRoute = () => {
  // If the user is not authenticated, they will be redirected to the `/login` route.
  return (
    <Authenticated key="my-routes" redirectOnFail="/login">
      <div>Authenticated</div>
    </Authenticated>
  );
};
```

## Index Route

Since we've defined a single resource `products` and defined the routes with the `/products` prefix, we'll be needing an index route to redirect users to the `/products` routes.

For this case, there can be multiple approaches depending on your routing library. Regardless of the library, Refine provides a `<NavigateToResource />` component to redirect users to the list route of a resource.

```tsx
import { NavigateToResource } from "@refinedev/react-router-v6";

const IndexRoute = () => {
  return <NavigateToResource resource="protected-products" />;
};
```

## Updating Routes

Now we'll be updating our routes to handle authentication and redirects by taking advantage of the `<Authenticated />` and `<NavigateToResource />` components.

Try to update your `src/App.tsx` file with the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
// highlight-next-line
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

// highlight-next-line
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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
      >
        <Routes>
          <Route
            element={
              // We're wrapping our routes with the `<Authenticated />` component
              // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
              // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <Header />
                <Outlet />
              </Authenticated>
            }
          >
            {/* We're defining an index route to redirect users to the `/products` route */}
            <Route
              index
              element={<NavigateToResource resource="protected-products" />}
            />
            <Route path="/products">
              <Route index element={<ListProducts />} />
              <Route path=":id" element={<ShowProduct />} />
              <Route path=":id/edit" element={<EditProduct />} />
              <Route path="create" element={<CreateProduct />} />
            </Route>
          </Route>
          <Route
            element={
              // Notice that now we're using the `fallback` prop to render the `<Outlet />` component if the user is not authenticated.
              // If the user is authenticated, they will be redirected to the `/products` route.
              // `/login` route will be rendered if the user is not authenticated.
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource resource="protected-products" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
```

<AddAuthenticationToApp />

Now we've updated our routes to handle authentication, redirect to the appropriate routes depending on the authentication status and redirect to the `/products` route from the index route.

In the next step, we'll be updating our components to benefit from the parameter inference of Refine.

</Sandpack>
