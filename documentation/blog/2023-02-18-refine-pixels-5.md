---
title: Creating an Admin Dashboard with Refine
description: We'll be building a admin backend app for the Pixels client app.
slug: refine-pixels-5
authors: abdullah_numan
tags: [refine-week, Refine, supabase]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-18-refine-pixels-5%2Fsocial.png
hide_table_of_contents: false
---

This post is the first part of an admin dashboard app built using [**Refine**](https://github.com/refinedev/refine). The dashboard is an admin backend for the **Pixels** client that we built previously in the [**RefineWeek**](https://refine.dev/week-of-refine/) series. We are using the same [**Supabase**](https://supabase.com/) database for this app and have [**Ant Design**](https://ant.design/) as the UI framework.

This is Day 5, and **RefineWeek** is a seven-part tutorial series that aims to help developers learn the ins-and-outs of **Refine**'s powerful capabilities within a week.

- You can find the complete source code for the **Pixels Admin** app on [GitHub](https://github.com/refinedev/refine/tree/main/examples/pixels-admin)
- Also **Pixel Client** app source code from previous days can be found [here](https://github.com/refinedev/refine/tree/main/examples/pixels)

### RefineWeek series

- Day 1 - [Pilot & Refine architecture](https://refine.dev/blog/refine-pixels-1/)
- Day 2 - [Setting Up the Client App](https://refine.dev/blog/refine-pixels-2/)
- Day 3 - [Adding CRUD Actions and Authentication](https://refine.dev/blog/refine-pixels-3/)
- Day 4 - [Adding Realtime Collaboration](https://refine.dev/blog/refine-pixels-4/)
- Day 5 - [Creating an Admin Dashboard with Refine](https://refine.dev/blog/refine-pixels-5/)
- Day 6 - [Implementing Role Based Access Control](https://refine.dev/blog/refine-pixels-6/)
- Day 7 - [Audit Log With Refine](https://refine.dev/blog/refine-pixels-7/)

## Overview

In this episode, we implement user authentication and CRUD functionalities of the dashboard. As it was in the case of the **Pixels** client app, for this app also, we implement an email-based authentication along with social logins with Google and GitHub.

We use the same **Supabase** client for connecting to the database we already have in place for the **Pixels** app.

The dashboard shows a list of all users. It also has a list for canvases.

The user list is read only and the canvas list will eventually allow editors and admins - particular to their roles - to manipulate their subject data. We will implement proper authorization for editor and admin roles on Day 6, but for now we will implement relevant CRUD operations that will apply to any authenticated user.

For the API requests, we will be using the `dataProvider` object **Refine** gave us for **Supabase**. Since we covered CRUD related concepts and architecture in depth on [Day 3](https://refine.dev/blog/refine-pixels-3/), in this post, we'll focus more on the **Ant Design** components side.

Let's begin with the project set up.

## Project Setup

As done previously in the client app, let's initialize our admin app with `create refine-app`. We will choose the interactive option by answering necessary questions. Let's run the following command:

```bash
npm create refine-app@latest pixels-admin
```

We will use **Supabase** for our backend, and **Ant Design** for our UI. We want to be able to customize the **Ant Design** theme and layout. So, we have the below answers related to **Supabase** and **Ant Design**:

```bash
✔ Choose a project template · Refine(Vite)
✔ What would you like to name your project?: · pixels-admin
✔ Choose your backend service to connect: · Supabase
✔ Do you want to use a UI Framework?: · Ant Design
✔ Do you want to add example pages?: · no
✔ Do you need i18n (Internationalization) support?: · no
✔ Choose a package manager: · npm
```

After completion of the initialization process, we should have the same **Refine**, **Supabase** and **Ant Design** boilerplate code generated for us like before.

We'll start tweaking the relevant code straight away as we add features to our app - since we have already explored the boilerplate code in significant depth on Day 2 in [Setting Up the Client App](https://refine.dev/blog/refine-pixels-2/) and on Day 3 in [Adding CRUD Actions and Authentication](https://refine.dev/blog/refine-pixels-3/). This will give us more time to focus on related **Ant Design** components and what they handle for us in the background.

Prior to that, let's just navigate to the project folder and run the dev server:

```bash
npm run dev
```

And prepare ourselves to the call-to-action at `http://localhost:5173`:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/welcome.jpg"  alt="react supabase CRUD App" />

<br />

The `App.tsx` file should be familiar from [Day 2](https://refine.dev/blog/refine-pixels-2/). It looks like this:

```tsx title="src/App.tsx"
import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { supabaseClient } from "./utility";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerBindings}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route index element={<WelcomePage />} />
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
```

Let's start modifying the existing code to meet our requirements.

## Setting Up Supabase Config

For the admin app, we'll connect to the same PostgreSQL database already up and running on **Supabase** for the **Pixels** client app.

So, we need to get the access credentials for our server from the **Supabase** dashboard. We can avail them by following [this section in the **Supabase** quickstart guide](https://supabase.com/docs/guides/with-react#get-the-api-keys). Let's store them in an `.env` file.

We'll go ahead and update the `supabaseClient.ts` file:

```tsx title="src/utility/supabaseClient.ts"
import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY ?? "";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
```

Now we have enabled `authProvider` and `dataProvider` methods to connect to our **Supabase** database with `supabaseClient()`.

## Adding required files

[Here is the finalized version of what we’ll be building in this article:](https://github.com/refinedev/refine/tree/main/examples/pixels-admin)

Before we move on, you need to add required page and components to the project if you want build the app by following the article . Please add the following components and files into src folder in the project:

- pages: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/pages
- components: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/components
- providers: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/providers
- utility: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/utility
- casbin: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/casbin
- types: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/types
- assets: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/public

:::danger Important

In order to run the app without warnings you need to follow [Casbin RBAC system installation step(Browser Fallbacks for Casbin).](/blog/refine-pixels-6/#casbin-installation)

:::

After creating files above you need to add some imports and [routes](/docs/packages/list-of-packages) to `src/App.tsx` file. Simply add replace your App.tsx with following.

<details>
<summary>Show App.tsx code</summary>
<p>

```tsx title="App.tsx"
import {
  Authenticated,
  CanAccess,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import {
  ErrorComponent,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { ConfigProvider } from "antd";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { Title } from "./components/layout";
import { supabaseClient } from "./utility";
import {
  auditLogProvider,
  authProvider,
  accessControlProvider,
} from "./providers";
import { CanvasList, UserList } from "./pages";
import { AuthPage } from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3ecf8e",
            colorText: "#80808a",
            colorError: "#fa541c",
            colorBgLayout: "#f0f2f5",
            colorLink: "#3ecf8e",
            colorLinkActive: "#3ecf8e",
            colorLinkHover: "#3ecf8e",
          },
        }}
      >
        <Refine
          auditLogProvider={auditLogProvider}
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          authProvider={authProvider}
          accessControlProvider={accessControlProvider}
          routerProvider={routerBindings}
          notificationProvider={useNotificationProvider}
          resources={[
            {
              name: "users",
              list: "/users",
            },
            {
              name: "canvases",
              list: "/canvases",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated>
                  <ThemedLayoutV2 Title={Title}>
                    <CanAccess>
                      <Outlet />
                    </CanAccess>
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route index element={<NavigateToResource />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/canvases" element={<CanvasList />} />
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource resource="users" />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={<AuthPage type="login" registerLink={false} />}
              />
              <Route
                path="/forgot-password"
                element={<AuthPage type="forgotPassword" />}
              />
              <Route
                path="/update-password"
                element={<AuthPage type="updatePassword" />}
              />
            </Route>

            <Route
              element={
                <Authenticated>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
```

</p>
</details>

:::note

[`<Refine />`](/docs/core/refine-component) comes with [dark mode support](/docs/ui-integrations/ant-design/theming#switching-to-dark-theme) out-of-the-box. However, we will not be using it in this series. So, after copied `App.tsx` you will see that we have already replaced `ColorModeContextProvider` with the `ConfigProvider`.

Also, you can remove `src/context/color-mode` that comes with `create refine-app`.

:::

## Creating a Table View With Refine and Ant Design

Our `<UserList />` component looks like this:

<details>
<summary>Show UserList code</summary>
<p>

```tsx title="pages/users/list.tsx"
import { useTable, List } from "@refinedev/antd";
import { Table, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { TUser } from "../../types/user";

export const UserList = () => {
  const { tableProps } = useTable<TUser>();

  return (
    <List>
      <Table {...tableProps} rowKey={"id"}>
        <Table.Column
          dataIndex="avatar_url"
          title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>Avatar</h4>
          }
          render={(_, record: TUser) => (
            <Avatar
              icon={<UserOutlined />}
              src={record.avatar_url}
              size={{ xs: 24, sm: 32, md: 40 }}
            />
          )}
        />
        <Table.Column
          dataIndex="id"
          title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>ID</h4>
          }
          render={(_, record: TUser) => (
            <p style={{ textAlign: "center" }}>{record?.id}</p>
          )}
        />
        <Table.Column
          dataIndex="email"
          title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>Email</h4>
          }
          render={() => <p style={{ textAlign: "center" }}>Not listed</p>}
        />
        <Table.Column
          dataIndex="full_name"
          title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
              Full Name
            </h4>
          }
          render={(_, record: TUser) =>
            record.full_name ? (
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {record.full_name}
              </p>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                --
              </p>
            )
          }
        />
        <Table.Column
          dataIndex="username"
          title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
              Username
            </h4>
          }
          render={(_, record: TUser) =>
            record.username ? (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {record.username}
              </p>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                --
              </p>
            )
          }
        />
      </Table>
    </List>
  );
};
```

</p>
</details>

The components tree looks very plain, but there is plenty going on in there. Firstly, the `useTable()` hook that handles all the data fetching stuff with **React Query** in the background. The `<List />` and `<Table />` components also do intense secret service for us. We'll go over them one by one below.

### Refine Ant Design `useTable()` Hook

[`useTable()`](https://refine.dev/docs/api-reference/antd/hooks/table/useTable/) is a **Refine** **Ant Design** hook served to us from the `@refinedev/antd` package. As we can see above, it returns us a `tableProps` object:

```tsx
const { tableProps } = useTable<TUser>();
```

`useTable()` is built on top of **Refine** core's [`useMany()`](https://refine.dev/docs/api-reference/core/hooks/data/useMany/) data hook. `useMany()`, in turn, invokes the [`getMany()`](https://refine.dev/docs/api-reference/core/providers/data-provider/#getmany) data provider method.

Here, we did not need to set any configuration for our API request and the returned response. The `resource.name` was figured by `useTable` from the `resources` prop that was passed to `<Refine />`. It is possible to set options for **sorting**, **filtering**, **pagination**, etc. with an object passed to `useTable()`.

For all the features that come with the `useTable()` hook, visit [the API reference here](https://refine.dev/docs/api-reference/antd/hooks/table/useTable/).

The properties of the `tableProps` object produced are intended to be passed to a `<Table />` component, which we'll consider after `<List />`.

### Refine Ant Design `<List />` Component

The [`<List />`](https://refine.dev/docs/api-reference/antd/components/basic-views/list/) component represents a list view. It is a wrapper around the contents of the list. It accepts a number of relevant props and comes with their sensible defaults, such as for `resource` name and `title` of the page.

In our case, we don't have to pass in any prop because **Refine** figures the `resource` name and `title` from the `resources` prop. In other words, the `<List />` component above is conveniently equivalent to this:

```tsx
<List resource="users" title="Users">
  // Content here...
</List>
```

For more on the usage of `<List />`, look into [the details here](https://refine.dev/docs/api-reference/antd/components/basic-views/list/).

### Refine Ant Design `<Table />` Component

[`useTable()`](https://refine.dev/docs/api-reference/antd/hooks/table/useTable/) hook's `tableProps` is specifically configured to match the props of **Ant Design**'s native `<Table />` component. **Refine** makes `<Table />` available to us with the `@refinedev/antd` module.

Besides passing in the `tableProps` object to `<Table />`, we are required to provide a unique `rowKey` prop to identify each row in the table:

```tsx
<Table {...tableProps} rowKey="id">
  // React nodes here...
</Table>
```

The records inside `tableProps` are placed inside `<Table.Column />`s of a row of the table - one record per row. If you're new to this, feel free to dive into the [**Ant Design** docs for `<Table />`](https://ant.design/components/table).

### Refine Ant Design `<Table.Column />` Children

`<Table.Column />`s represent individual columns in the table. A column header is set by `<Table.Column />`'s `title` prop. The value of a field in a record is set by the `dataIndex` prop. For example, for the following column, `dataIndex="email"` tells our app to fill the `Email` column of a row associated with a particular `record` with the value of the record's `email` property:

```tsx
<Table.Column dataIndex="email" title="Email" />
```

We can also customize what content to render inside a table cell. We'll examine two such instances in the next section on `<CanvasList />` view, which involves an editable table.

## Adding `resources`

We have covered adding CRUD operations on [Day 3](https://refine.dev/blog/refine-pixels-3/) in significant depth. So, here we'll quickly add both `users` and `canvases` resources to `<Refine />` component:

```tsx title="App.tsx"
// ...
import { Refine } from "@refinedev/core";
import { UserList } from "pages";

return (
  <Refine
    // ...
    //highlight-start
    resources={[
      {
        name: "users",
        list: "/users",
      },
      {
        name: "canvases",
        list: "/canvases",
      },
    ]}
    //highlight-end
  />
);
```

## Adding routes

After adding resources we need to create routes for them. For the routes, we'll use the `<UserList/>` and `<CanvasList/>` components we created earlier.

[Refer to the CRUD Pages tutorial for more information. →](/docs/ui-integrations/ant-design/introduction)

```tsx title="App.tsx"
// ...

import { Authenticated, CanAccess, Refine } from "@refinedev/core";
import { ErrorComponent, ThemedLayoutV2 } from "@refinedev/antd";
import routerBindings, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { CanvasList, UserList } from "./pages";
import { AuthPage } from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      {/* ... */}
      <Refine
        // ...
        routerProvider={routerBindings}
      >
        <Routes>
          <Route
            element={
              <Authenticated>
                <ThemedLayoutV2 Title={Title}>
                  <CanAccess>
                    <Outlet />
                  </CanAccess>
                </ThemedLayoutV2>
              </Authenticated>
            }
          >
            <Route index element={<NavigateToResource />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/canvases" element={<CanvasList />} />
          </Route>
          <Route
            element={
              <Authenticated fallback={<Outlet />}>
                <NavigateToResource resource="users" />
              </Authenticated>
            }
          >
            <Route
              path="/login"
              element={<AuthPage type="login" registerLink={false} />}
            />
            <Route
              path="/forgot-password"
              element={<AuthPage type="forgotPassword" />}
            />
            <Route
              path="/update-password"
              element={<AuthPage type="updatePassword" />}
            />
          </Route>

          <Route
            element={
              <Authenticated>
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              </Authenticated>
            }
          >
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
        {/* ... */}
      </Refine>
    </BrowserRouter>
  );
}

export default App;
```

## `<AuthPage />` Customization

At this point, it is helpful that we customize our **Ant Design** theme, the content of the `<AuthPage />` and implement GitHub authentication. We won't cover these here, as they are relatively straight forward and were covered on [Day 3](https://refine.dev/blog/refine-pixels-3/).

Remember, we've already replaced `App.tx` code with the following:

<details>
<summary>Show App.tsx code</summary>
<p>

```tsx title="App.tsx"
import {
  Authenticated,
  CanAccess,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import {
  ErrorComponent,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { ConfigProvider } from "antd";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { Title } from "./components/layout";
import { supabaseClient } from "./utility";
import {
  auditLogProvider,
  authProvider,
  accessControlProvider,
} from "./providers";
import { CanvasList, UserList } from "./pages";
import { AuthPage } from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3ecf8e",
            colorText: "#80808a",
            colorError: "#fa541c",
            colorBgLayout: "#f0f2f5",
            colorLink: "#3ecf8e",
            colorLinkActive: "#3ecf8e",
            colorLinkHover: "#3ecf8e",
          },
        }}
      >
        <Refine
          auditLogProvider={auditLogProvider}
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          authProvider={authProvider}
          accessControlProvider={accessControlProvider}
          routerProvider={routerBindings}
          notificationProvider={useNotificationProvider}
          resources={[
            {
              name: "users",
              list: "/users",
            },
            {
              name: "canvases",
              list: "/canvases",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated>
                  <ThemedLayoutV2 Title={Title}>
                    <CanAccess>
                      <Outlet />
                    </CanAccess>
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route index element={<NavigateToResource />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/canvases" element={<CanvasList />} />
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource resource="users" />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={<AuthPage type="login" registerLink={false} />}
              />
              <Route
                path="/forgot-password"
                element={<AuthPage type="forgotPassword" />}
              />
              <Route
                path="/update-password"
                element={<AuthPage type="updatePassword" />}
              />
            </Route>

            <Route
              element={
                <Authenticated>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
```

</p>
</details>

Since `authProvider` prop is already passed in by default, after we added the above resources and granted we are connected to the Internet, we will be redirected to the login page:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/login.jpg"  alt="react supabase CRUD App" />

<br />

From the `/login` route, logging in should work perfectly with an account already created with the **Pixels** client app. If we log in, we should be directed to `/users` - the default root route of the admin app.

The `name: "users"` property in our first resource is used to define the `/users` route, and `list: UserList` property specifies that `<UserList />` component should be rendered at `/users`.

:::note

Since we are using our example Supabase backend, we will see the following users list.

If you wish to use our example Supabase backend, you can do so by using the provided [Supabase credentials](https://github.com/refinedev/refine/blob/main/examples/pixels-admin/src/utility/supabaseClient.ts).

You can log into the application with the following account:

```
email: demo@refine.dev
password: demodemo
```

:::

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/user-list.jpg"  alt="react supabase CRUD App" />

<br />

## Editable Table Using Refine and Ant Design

For our `<CanvasList />` view, we want to allow **editors** and **admins** to promote or delete a `canvas` item. This means, we need to be able to send `POST`, `PUT`/`PATCH` and `DELETE` requests. `@refinedev/antd`'s `useEditableTable()` hook makes life beautiful for us.

We have a `useEditableTable()` hook in action inside our `<CanvasList />` component:

<details>
<summary>CanvasList code</summary>
<p>

```tsx title="pages/canvases/list.tsx"
import { useState } from "react";
import { useUpdate } from "@refinedev/core";
import {
  List,
  useEditableTable,
  useModal,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Form, Button, Space, Tag, Modal, Avatar } from "antd";

import { TCanvas } from "../../types/canvas";
import { LogList } from "../../components/logs";
import { CanvasItem } from "../../components/canvas";

type TCanvasPromoteResult = {
  id: number;
  featured: boolean;
};

export const CanvasList = () => {
  const [currentCanvas, setCurrentCanvas] = useState({});
  const { modalProps, show, close } = useModal();
  const { tableProps, formProps } = useEditableTable<TCanvas>({
    liveMode: "auto",
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "desc",
        },
      ],
    },
    meta: {
      select: "*, pixels(id, canvas_id, user_id, x, y, color)",
    },
  });
  const { mutate } = useUpdate<TCanvasPromoteResult>();

  return (
    <List>
      <Form {...formProps}>
        <Table {...tableProps} rowKey="id">
          <Table.Column<TCanvas>
            key="id"
            dataIndex="id"
            title={
              <h4
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Canvas
              </h4>
            }
            render={(_, record) => (
              <Avatar
                shape="square"
                size={64}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                icon={
                  <CanvasItem
                    canvas={record}
                    pixels={record?.pixels}
                    border={true}
                    scale={5 / record?.width}
                    active={false}
                  />
                }
              />
            )}
          />
          <Table.Column<TCanvas>
            key="name"
            dataIndex="name"
            title={
              <h4
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Name
              </h4>
            }
          />
          <Table.Column<TCanvas>
            key="is_featured"
            dataIndex="is_featured"
            title={
              <h4
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Featured
              </h4>
            }
            render={(_, record) =>
              record.is_featured ? (
                <Tag
                  color="success"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Yes
                </Tag>
              ) : (
                <Tag
                  color="warning"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  No
                </Tag>
              )
            }
          />
          <Table.Column<TCanvas>
            title={
              <h4
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Actions
              </h4>
            }
            dataIndex="actions"
            render={(_, record) => (
              <Space
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  size="small"
                  style={{ width: "100px" }}
                  type={record.is_featured ? "ghost" : "primary"}
                  onClick={() =>
                    mutate({
                      resource: "canvases",
                      id: record.id,
                      values: {
                        is_featured: !record.is_featured,
                      },
                      meta: {
                        canvas: record,
                      },
                    })
                  }
                >
                  {record.is_featured ? "Unpromote" : "Promote"}
                </Button>
                <>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      setCurrentCanvas(record);
                      show();
                    }}
                  >
                    View Changes
                  </Button>
                </>
                <DeleteButton size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </Form>
      <Modal
        title={<h3 style={{ fontWeight: "bold" }}>Canvas Changes</h3>}
        {...modalProps}
        centered
        destroyOnClose
        onOk={close}
        onCancel={() => {
          close();
          setCurrentCanvas({});
        }}
        footer={[
          <Button type="primary" key="close" onClick={close}>
            Close
          </Button>,
        ]}
      >
        <LogList currentCanvas={currentCanvas} />
      </Modal>
    </List>
  );
};
```

</p>
</details>

### Refine Ant Design `useEditableTable()` Hook

The `useEditableTable()` hook is the extension of `@refinedev/antd`'s `useTable()` hook. It returns a `formProps` object that we can pass to `<Form />` components in order to handle form actions, loading and displaying success and error messages.

Like `useTable()`, the `useEditableTable()` hook also returns a `tableProps` object:

```tsx
const { tableProps, formProps } = useEditableTable<TCanvas>();
```

The items of `formProps` object are passed to the `<Form />` component:

```tsx
<Form {...formProps}>// React nodes here...</Form>
```

We can do much more with the `useEditableTable()` hook, like activating editing fields when a row is clicked . Here's the elaborate [documentation for `useEditableTable()`](https://refine.dev/docs/api-reference/antd/hooks/table/useEditableTable/)

### Refine Ant Design `<DeleteButton />`

Thanks to the `formProps` being passed to `<Form />`, implementing `delete` action becomes a piece of cake:

```tsx
<DeleteButton size="small" recordItemId={record.id} />
```

`@refinedev/antd`'s `<DeleteButton />` leverages **Ant Design**'s `<Button />` and `<Popconfirm />` components. It invokes the `delete()` data provider method to send a `DELETE` request to the `resource` end point. The `resource.name` is inferred from the `formProps` passed to `<Form />` component.

For more details, visit the [`<DeleteButton />` docs.](https://refine.dev/docs/api-reference/antd/components/buttons/delete-button/)

### `<Table.Column />`'s `render` Prop

We can customize the content inside our table cell by passing a function to the `render` prop of `<Table.Column />`. In our example, we have a conditional rendering, where the component being rendered depends on `record.is_featured`:

```tsx
<Table.Column<TCanvas>
  key="is_featured"
  dataIndex="is_featured"
  title={<h4 style={{ textAlign: "center", fontWeight: "bold" }}>Featured</h4>}
  render={(_, record) =>
    record.is_featured ? (
      <Tag
        color="success"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Yes
      </Tag>
    ) : (
      <Tag
        color="warning"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No
      </Tag>
    )
  }
/>
```

We also grouped content inside a cell, with `<Button />` and `<DeleteButton />` being sibling flex items:

```tsx
<Table.Column<TCanvas>
  title={<h4 style={{ textAlign: "center", fontWeight: "bold" }}>Actions</h4>}
  dataIndex="actions"
  render={(_, record) => (
    <Space style={{ display: "flex", justifyContent: "center" }}>
      <Button
        size="small"
        style={{ width: "100px" }}
        type={record.is_featured ? "ghost" : "primary"}
        onClick={() =>
          mutate({
            resource: "canvases",
            id: record.id,
            values: {
              is_featured: !record.is_featured,
            },
            metaData: {
              canvas: record,
            },
          })
        }
      >
        {record.is_featured ? "Unpromote" : "Promote"}
      </Button>
      <DeleteButton size="small" recordItemId={record.id} />
    </Space>
  )}
/>
```

## Adding `<CanvasList>` to the `resources`

We have covered adding CRUD operations on [Day 3](https://refine.dev/blog/refine-pixels-3/) in significant depth. So, here we'll quickly add `canvases` resources to `<Refine />` component:

```tsx title="src/App.tsx"
import { CanvasList } from "pages";
...

return (
  <Refine
    ...
    authProvider={authProvider}
    // highlight-start
    resources={[
      {
          name: "canvases",
          list: "/canvases",
        },
    ]}
    // highlight-end
  />
)
```

With these additions, `/canvases` looks like this:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/canvas-list.jpg"  alt="react supabase CRUD App" />

<br />

## Summary

In this post, we initialized an admin dashboard app for our **Pixels** client app which we built in the previous episodes in the [RefineWeek](https://refine.dev/week-of-refine/) series. We implemented list views for two `resources`: `users` and `canvases`.

Inside the lists, we fetched data from these resources and rendered them inside tables. We implemented two types of tables using two distinct `@refinedev/antd` hooks: `useTable()` for regular tables and `useEditableTable()` that allows data in the table to be mutated.

These hooks are supported by **Refine** core's `useMany()` hook, which uses the `getMany()` data provider method to interact with external API.

In the UI side, these hooks automatically make available appropriate props to be passed to `<Table />` and `<Form />` components.

In the next post, we will focus on implementing Role Based Access Control to our dashboard based on `editor` and `admin` roles.

[Click here to read "Implementing Role Based Access Control" article. &#8594](https://refine.dev/blog/refine-pixels-6/)
