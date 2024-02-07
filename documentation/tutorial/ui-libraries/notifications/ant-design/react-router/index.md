---
title: Notifications
---

import { Sandpack, AddNotificationProviderToApp } from "./sandpack.tsx";

<Sandpack>

Now we've refactored our application with Ant Design, we only have one thing left to do: handle notifications. Refine triggers notification in various scenarios, such as when a record is created, updated, or deleted, when there is an error from your data provider or your auth provider. It's important to provide feedback to the user when interacting with the application.

All these notifications are enabled just by providing a `notificationProvider` prop to the `<Refine />` component. A notification provider is responsible from displaying and dismissing notifications as well as handling undoable mutation notifications.

Ant Design provides a notification system that can be used to handle these notifications by using the `useNotificationProvider` export of the `@refinedev/antd` package.

## Adding Notification Provider

To add the notification provider to our application, we need to import the `useNotificationProvider` from the `@refinedev/antd` package and pass it to the `notificationProvider` prop of the `<Refine />` component.

Try to update the `src/App.tsx` file with the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
// highlight-next-line
import { ThemedLayoutV2, useNotificationProvider } from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

import { Login } from "./login";

import "antd/dist/reset.css";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            // highlight-next-line
            notificationProvider={useNotificationProvider}
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
            <Routes>{/* ... */}</Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
```

<AddNotificationProviderToApp />

Now we're set with the notification provider. You can now create, update, and delete records to see the notifications in action.

## Summary

In this unit, we've covered the following topics:

- How Refine deals with the UI libraries,
- Using layouts and views to create complex UIs,
- Using tailored hooks and components to manage tables, forms, buttons and fields,
- Handling notifications in Refine with Ant Design's notification system.

In the next unit, we'll learn about the additional tools and packages that Refine provides to make the developer experience even better.

</Sandpack>
