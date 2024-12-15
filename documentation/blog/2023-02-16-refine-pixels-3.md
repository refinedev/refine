---
title: Adding CRUD Actions and Authentication
description: We'll initialize our Pixels app using Refine and get familiar with the boilerplate code to be created with the create refine-app CLI tool.
slug: refine-pixels-3
authors: abdullah_numan
tags: [refine-week, Refine, supabase]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-09-refine-pixels-3/social.png
hide_table_of_contents: false
---

In this post, we build on our existing understanding of [`dataProvider`](https://refine.dev/docs/data/data-provider) and [`authProvider`](https://refine.dev/docs/authentication/auth-provider) props of [`<Refine />`](https://refine.dev/docs/api-reference/core/components/refine-config/) to implement CRUD operations in our **Pixels** app that we initialized in the previous post. While doing so, we discuss the roles of `<Refine />` component's [`resources`](https://refine.dev/docs/guides-concepts/general-concepts/#resource-concept) and `routerProvider` props as well.

CRUD actions are supported by the [**Supabase**](https://supabase.com/) data provider we chose for our project and in this post we use them to build a public gallery of canvases. We implement creation and displaying of individual canvases as well as drawing on them. We also add authentication features supported by the `supabaseClient` we discussed on Day Two of the [**RefineWeek**](https://refine.dev/week-of-refine-supabase/) series.

This is Day Three and **RefineWeek** is a seven-part tutorial that aims to help developers learn the ins-and-outs of **Refine**'s powerful capabilities and get going with **Refine** within a week.

### RefineWeek series

- Day 1 - [Pilot & Refine architecture](https://refine.dev/blog/refine-pixels-1/)
- Day 2 - [Setting Up the Client App](https://refine.dev/blog/refine-pixels-2/)
- Day 3 - [Adding CRUD Actions and Authentication](https://refine.dev/blog/refine-pixels-3/)
- Day 4 - [Adding Realtime Collaboration](https://refine.dev/blog/refine-pixels-4/)
- Day 5 - [Creating an Admin Dashboard with Refine](https://refine.dev/blog/refine-pixels-5/)
- Day 6 - [Implementing Role Based Access Control](https://refine.dev/blog/refine-pixels-6/)
- Day 7 - [Audit Log With Refine](https://refine.dev/blog/refine-pixels-7/)

## Overview

In the last episode, we explored **Refine**'s auth and data providers in significant detail. We saw that `<Refine />`'s `dataProvider` and `authProvider` props were set to support [**Supabase**](https://supabase.com/) thanks to the [`@refinedev/supabase`](https://github.com/refinedev/refine/tree/main/packages/supabase) package.

We mentioned that `dataProvider` methods allow us to communicate with API endpoints and `authProvider` methods help us with authentication and authorization. We are able to access and invoke these methods from consumer components via their corresponding hooks.

In this post, we will be leveraging **Supabase** `dataProvider` methods to implement CRUD operations for a `canvases` resource. We are going to start by adding `canvases` as a resource on which we will be able to perform `create`, `show` and `list` actions. We will first work on a public gallery that lists all canvases and a dashboard page that shows a selection of featured canvases by implementing the `list` action. We will allow users to perform the canvas `create` action from a modal. Then we will also implement the `show` action for a canvas.

We will then apply **Supabase** auth provider to allow only logged in users to carry out `create` actions on `canvases` and `pixels`. On the way, we will explore how **Refine** does the heavylifting under the hood for us with [**React Query**](https://react-query-v3.tanstack.com/), and its own set of providers and hooks - making CRUD operations implementation a breeze.

But before we start, we have to set up **Supabase** with our database tables and get the access credentials.

## Setting Up Supabase for Refine

For this app, we are using a PostgreSQL database for our backend. Our database will be hosted in the **Supabase** cloud. In order to set up a PostgreSQL server, we need to sign up with [**Supabase**](https://app.supabase.com/) first.

After signing up and logging in to a developer account, we have to complete the following steps:

1. Create a PostgreSQL server with an appropriate name.
2. Create necessary tables in the database and add relationships.
3. Get API keys provided by **Supabase** for the server and set up `supabaseClient` inside our **Refine** project.

Below, we go over these steps one by one.

### 1. Creating a PostgreSQL Server with Supabase

Creating a database server is quite intuitive in **Supabase**. Just go over to your organization's dashboard and start doing something. For me, I have initialized a server with the name `refine-pixels` under a free tier. If you need a quick hand, please follow [this quickstart guide](https://supabase.com/docs/guides/with-react#create-a-project).

### 2. Adding Tables to a Supabase Database

For our app, we have four tables: `auth.users`, `public.users`, `canvases` and `pixels`. The entity relational diagram for our database looks like this:

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-09-refine-pixels-3/supabase_Table.png"  alt="react crud app" />
</div>

<br/>

<br />

We have a fifth, `logs` table which we are going to use for audit logging with the `auditLogProvider` on Day Seven. However, as we are progressing step by step, we are not concerned with that at the moment. We will be adding the `logs` table on its day.

In order to add the above tables to your **Supabase** database, please follow the below instructions:

**2.1 `auth.users` Table**

The `auth.users` table is concerned with authentication in our app. It is created by **Supabase** as part of its authentication module, so we don't need to do anything about it.

**Supabase** supports a myriad of third party authentication providers as well as user input based email / password authentication. In our app, we'll implement GitHub authentication besides the email / password based option.
<br />

**2.2 `public.users` Table**

**Supabase** doesn't allow a client to query the `auth.users` table for security reasons. So, we need to create a shadow of the `auth.users` table in `public.users` with additional columns. We need this shadow table to be able to query `user` information, such as `avatar_url` and `roles` from this table.

<div className="centered-image"  >
   <img style={{alignSelf:"center", width: "300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-09-refine-pixels-3/sql_editor.png"  alt="react crud app" />
</div>

<br/>

<br />

So, in order to create the `public.users` table, go ahead and run this SQL script in the SQL Editor of your **Supabase** project dashboard:

```sql
-- Create a table for public users
create table users (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text
);

-- This trigger automatically creates a public.users entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create or replace function public.handle_new_public_user()
returns trigger as $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_public_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');
```

<br />

**2.3 `canvases` Table**

For the `canvases` table, run this SQL script inside the **Supabase** SQL Editor:

```sql
create table canvases (
  id text unique primary key not null,
  user_id uuid references users on delete cascade not null,
  name text not null,
  width int8 not null,
  height int8 not null,
  is_featured boolean default false not null,

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

<br />

**2.4 `pixels` Table**

For the `pixels` table run the following SQL script:

```sql
create table pixels (
  id int8 generated by default as identity primary key not null,
  user_id uuid references users on delete cascade not null,
  canvas_id text references canvases on delete cascade not null,
  x int8 not null,
  y int8 not null,
  color text not null,

  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

If you want to create the tables using Table Editor from the dashboard, feel free to use [the Supabase docs](https://supabase.com/docs/guides/database/tables#creating-tables).
<br />

**2.5 Relationship Between Tables**

If we look closely, `public.users` table has a **one-to-many** relationship with `canvases` and a `canvas` must belong to a `user`.

Similarly `canvases` also has a one-to-many relationship with `pixels`. A `canvas` has many `pixels` and a `pixel` must belong to a `canvas`.

Also, `public.users` has a one-to-many relationship with `pixels`.
<br />

**2.5 Disable RLS**

For simplicity, we'll disable Row Level Security:

<div className="centered-image"  >
   <img style={{alignSelf:"center", width: "600px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-09-refine-pixels-3/disable_rls.png"  alt="react crud app supabase" />
</div>

<br/>

### 3. Set Up `supabaseClient` for `<Refine />` Providers

Now it's time to use the **Supabase** hosted database server inside our **Refine** app.

First, we need to get the access credentials for our server from the **Supabase** dashboard. We can avail them by following [this section](https://supabase.com/docs/guides/with-react#get-the-api-keys) in the **Supabase** quickstart guide.

I recommend storing these credentials in a [`.env` file](https://vitejs.dev/guide/env-and-mode.html):

```bash title=".env"
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_KEY=YOUR_SUPABASE_KEY
```

Doing so will let us use these credentials to update the `supabaseClient.ts` file created by `refine ` at initialization:

```tsx title="supabaseClient.ts"
import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY ?? "";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
```

`<Refine />` component's `dataProvider`, `authProvider` and `liveProvider` objects utilize this `supabaseClient` to connect to the PostgreSQL server hosted on **Supabase**.

With this set up, now we can introduce `canvases` resource and start implementing CRUD operations for our app so that we can perform queries on the `canvases` table.

## `<Refine />`'s `resources` Prop

If we look at our initial `App.tsx` component, it looks like this:

```tsx title="App.tsx"
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
import { supabaseClient } from "./utility";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
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
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
```

Focusing on the top, in order to add a resource to our app, we have to introduce the [`resources`](https://refine.dev/docs/guides-concepts/general-concepts/#resource-concept) prop to [`<Refine />`](https://refine.dev/docs/api-reference/core/components/refine-config/). The value of `resources` prop should be an **array** of resource items with RESTful routes in our app. A typical resource object contains properties and values related to the resource `name`, `options`, and intended actions:

```json title="Typical resource object inside resources array"
{
  "name": "canvases",
  "list": "/canvases",
  "show": "/canvases/show/:id"
}
```

We can have as many resource items inside our `resources` array as the number of entities we have in our app.

**Refine** simplifies CRUD actions and acts as a bridge between the Data/API layer and the Document/Page Layer. A resource enables the application's pages to interact with the API. It's worth spending a few minutes exploring the possible properties of a resource item from the [`resources`](https://refine.dev/docs/api-reference/core/components/refine-config/#resources) docs here.

For the above `canvases` resource, the `name` property denotes the name of the resource. Behind the scenes, **Refine** auto-magically adds RESTful routes for the actions defined on a resource `name` to the `routerProvider` object - i.e. for us here along the `/canvases` path.

`list` and `show` properties represent the CRUD actions we want. And their values are the components we want to render when we navigate to their respective RESTful routes, such as `/canvases` and `/canvases/show/a-canvas-slug`.

We will use a modal form for the `create` action, so we don't need `/canvases/create` route. Therefore, we won't assign `create` property for `canvases` resource.

### Adding `resources` to `<Refine />`

For our app, we'll configure our `resources` object with actions for `canvases`. So, let's add `canvases` resource with `list` and `show` actions:

```tsx title="App.tsx"
<Refine
  // ...
  //highlight-start
  resources={[
    {
      name: "canvases",
      list: "/canvases",
      show: "/canvases/show/:id",
    },
  ]}
  //highlight-end
/>
```

We will consider these two actions with their respective components and routes in the coming sections.

We should have the `CanvasList` and `CanvasShow` components premade. In a **Refine** app, CRUD action related components are typically placed in a directory that has a structure like this: `src/pages/resource_name/`.

In our case, we'll house `canvases` related components in the `src/pages/canvases/` folder.

We are also using `index.ts` files to export contents from our folders, so that the components are easily found by the compiler in the global namespace.

### Adding required files

Here is the finalized version of what we'll be building in this article:
https://github.com/refinedev/refine/tree/main/examples/pixels

Before we move on, you need to add required page and components to the project if you want build the app by following the article. Please add the following components and files into the project:

- pages: https://github.com/refinedev/refine/tree/main/examples/pixels/src/pages
- components: https://github.com/refinedev/refine/tree/main/examples/pixels/src/components
- providers: https://github.com/refinedev/refine/tree/main/examples/pixels/src/providers
- utility: https://github.com/refinedev/refine/tree/main/examples/pixels/src/utility
- types: https://github.com/refinedev/refine/tree/main/examples/pixels/src/types
- styles: https://github.com/refinedev/refine/tree/main/examples/pixels/src/styles
- assets: https://github.com/refinedev/refine/tree/main/examples/pixels/public

After creating files above you need to add some imports and [routes](/docs/packages/list-of-packages) to `src/App.tsx` file. Simply add replace your App.tsx with following.

<details>
<summary>Show App.tsx code</summary>
<p>

```tsx title="App.tsx"
import { GitHubBanner, Refine, Authenticated } from "@refinedev/core";
import { useNotificationProvider, ErrorComponent } from "@refinedev/antd";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerBindings, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";
import { GithubOutlined } from "@ant-design/icons";

import { Layout } from "./components/layout";
import { CanvasFeaturedList, CanvasList, CanvasShow } from "./pages/canvases";
import { AuthPage } from "./pages/auth";
import { supabaseClient } from "./utility";
import { authProvider, auditLogProvider } from "./providers";

import "@refinedev/antd/dist/reset.css";
import "./styles/style.css";

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
          authProvider={authProvider}
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          auditLogProvider={auditLogProvider}
          routerProvider={routerBindings}
          resources={[
            {
              name: "canvases",
              list: "/canvases",
              show: "/canvases/show/:id",
            },
          ]}
          notificationProvider={useNotificationProvider}
        >
          <Routes>
            <Route
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route index element={<CanvasFeaturedList />} />

              <Route path="/canvases">
                <Route index element={<CanvasList />} />
                <Route path="show/:id" element={<CanvasShow />} />
              </Route>
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    providers={[
                      {
                        name: "github",
                        icon: (
                          <GithubOutlined
                            style={{
                              fontSize: "18px",
                            }}
                          />
                        ),
                        label: "Sign in with GitHub",
                      },
                    ]}
                  />
                }
              />
              <Route path="/register" element={<AuthPage type="register" />} />
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
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
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

After creating files above you can remove `src/authProvider` and `src/components/header` that comes with `create refine-app`.

We move this files to `src/providers/authProvider.ts` and `src/components/layout/header` for better folder structure.

:::

### `<Refine />` `list` Action

The `list` action represents a `GET` request sent to the `canvases` table in our **Supabase** db. It is done through the `dataProvider.getList` method that [`@refinedev/supabase`](https://github.com/refinedev/refine/blob/main/packages/supabase/src/index.ts) gave us. From the consumer `<CanvasList />` component, it can be accessed via the `useList()` hook.

**Refine** defines the routes for `list` action to be the `/canvases` path, and adds it to the `routerProvider` object. `/canvases` path, in turn, renders the `<CanvasList />` component, as specified in the `resources` array.

The contents of our `<CanvasList />` component look like this:

```tsx title="src/pages/canvases/list.tsx"
import { useSimpleList } from "@refinedev/antd";
import { List, Skeleton } from "antd";

import { CanvasTile } from "../../components/canvas";
import { SponsorsBanner } from "../../components/banners";
import { Canvas } from "../../types";

export const CanvasList: React.FC = () => {
  const { listProps, queryResult } = useSimpleList<Canvas>({
    resource: "canvases",
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "desc",
        },
      ],
    },
  });

  const { isLoading } = queryResult;

  return (
    <div className="container">
      <div className="paper">
        {isLoading ? (
          <div className="canvas-skeleton-list">
            {[...Array(12)].map((_, index) => (
              <Skeleton key={index} paragraph={{ rows: 8 }} />
            ))}
          </div>
        ) : (
          <List
            {...listProps}
            className="canvas-list"
            split={false}
            renderItem={(canvas) => <CanvasTile canvas={canvas} />}
          />
        )}
      </div>
      <SponsorsBanner />
    </div>
  );
};
```

There are a few of things to note here: the first being the use of **Ant Design** with **Refine**'s `@refinedev/antd` module. The second thing is the `useSimpleList()` hook that is being used to access `listProps` and `queryResult` items to feed UI elements. And third, the use of pagination and sorting in the query sent.

Let's briefly discuss what's going on:

**1. `refine-antd` and `antd` Components**

We will use the **Ant Design** [`<List />`](https://ant.design/components/list#list/) component to show the list of canvases.

[`<List />`](https://ant.design/components/list#list) component takes in the props inside `listProps` object that `useSimpleList()` hook prepares for us from the fetched canvases array and shows each canvas data inside the `<CanvasTile />` component. All the props and presentation logic are being handled inside the **Ant Design** `<List />` component.

[Refer to Ant Design documentation for more information About <List />. →](https://ant.design/components/list#list)

[Refer to complete Refine CRUD app with Ant Design tutorial here. →](https://refine.dev/docs/ui-integrations/ant-design/introduction)

**2. `useSimpleList()` Hook**

The `useSimpleList()` is a `@refinedev/antd` hook built on top of the low level [`useList()`](https://refine.dev/docs/api-reference/core/hooks/data/useList/) hook to fetch a resource collection. After fetching data according to the value of the `resource` property, it prepares it according to the `listProps` of the **Ant Design**'s `<List />` component.

In our `<CanvasList />` component, we are passing the `listProps` props to `<List />` in order to show a list of canvases.

Please feel free to go through the [`useSimpleList` documentation here](https://refine.dev/docs/api-reference/antd/hooks/list/useSimpleList/) for as much as information as you need. It makes life a lot easier while creating a dashboard or list of items.

**3. Sorting**
If you are already looking at the [`useSimpleList()` argument object's properties](https://refine.dev/docs/api-reference/antd/hooks/list/useSimpleList/#properties), notice that we are able to pass options for `pagination` and `sorters.initial` for the API call and get the response accordingly.

With this set up - and connected to the Internet - if we run the dev server with `npm run dev` and navigate to `http://localhost:5173`, we are faced with a `<CanvasFeaturedList/>` as a home page.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/featured-canvases.jpg"  alt="react crud app supabase" />

<br />

This is because we have configured our routes as public. Furthermore, we have set up our `<AuthPage/>` component as a route accessible to unauthenticated users. This means that if a user is not authenticated, they can access the `<AuthPage/>` component. However, if a user is authenticated, they will not be able to access the `<AuthPage/>` component.

In this project, our goal is to allow unauthenticated users to view created canvases. However, they will not have the ability to create, update, or delete canvases.

We already did this implementation when we created required files before starting the this section. In the next section, we will explain how redirect unauthenticated users to the login page if they attempt to perform create, update, or delete actions on canvases.

### Public Routes in Refine

If we revisit the `authProvider` object, we can see that the `check()` method only allows logged in users. All other attempts are rejected. We will use this logic to compose our routes.

<details>
<summary>Show `authProvider` code</summary>
<p>

```tsx title="src/authProvider.ts"
check: async () => {
    try {
            // sign in with oauth
            if (providerName) {
                const { data, error } =
                    await supabaseClient.auth.signInWithOAuth({
                        provider: providerName,
                    });

                if (error) {
                    return {
                        success: false,
                        error,
                    };
                }

                if (data?.url) {
                    return {
                        success: true,
                    };
                }
            }

            // sign in with email and password
            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email,
                    password,
                });

            if (error) {
                return {
                    success: false,
                    error,
                };
            }

            if (data?.user) {
                return {``
                    success: true,
                };
            }
        } catch (error: any) {
            return {
                success: false,
                error,
            };
        }

        return {
            success: false,
            error: {
                message: "Login failed",
                name: "Invalid email or password",
            },
        };
},
```

</p>
</details>

**Refine** provides [`<Authenticated/>`](/docs/authentication/components/authenticated) component to protect routes from unauthenticated users. It uses `authProvider.check` method under the hood. To use this component, we need to wrap the routes we want to protect with [`<Authenticated/>`](/docs/authentication/components/authenticated) component.

Let's look at the routes implementation:

 <details>
<summary>Show Routes implementation component code</summary>
<p>

```tsx title="src/components/layout/header/index.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerBindings, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GithubOutlined } from "@ant-design/icons";
import { AuthPage } from "./pages/auth";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        // ...
        routerProvider={routerBindings}
      >
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route index element={<CanvasFeaturedList />} />

            <Route path="/canvases">
              <Route index element={<CanvasList />} />
              <Route path="show/:id" element={<CanvasShow />} />
            </Route>
          </Route>
          <Route
            element={
              <Authenticated fallback={<Outlet />}>
                <NavigateToResource />
              </Authenticated>
            }
          >
            <Route
              path="/login"
              element={
                <AuthPage
                  type="login"
                  providers={[
                    {
                      name: "github",
                      icon: (
                        <GithubOutlined
                          style={{
                            fontSize: "18px",
                          }}
                        />
                      ),
                      label: "Sign in with GitHub",
                    },
                  ]}
                />
              }
            />
            <Route path="/register" element={<AuthPage type="register" />} />
            <Route
              path="/forgot-password"
              element={<AuthPage type="forgotPassword" />}
            />
            <Route
              path="/update-password"
              element={<AuthPage type="updatePassword" />}
            />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

</p>
</details>

In this example we didn't wrap our `canvases` resource routes with [`<Authenticated/>`](/docs/authentication/components/authenticated) component. This means that we can access the `canvases` resource routes without being authenticated.

However, we use `login`, `register`, `forgot-password` and `update-password` routes as a `fallback` of [`<Authenticated/>`](/docs/authentication/components/authenticated) component. This means that we can not access these routes if we are authenticated.

[Refer to the Auth Provider tutorial for more information. →](/docs/authentication/auth-provider)

### `<Refine />` `create` Action

The `create` action represents a `POST` request sent to the `canvases` table in our **Supabase** database. It is done with the `dataProvider.create()` method that `@refinedev/supabase` package gave us.

We are presenting the canvas form inside a modal contained in a `<CreateCanvas />` component, which is placed in the `<Header />` component. And the modal is accessed with a `Create` canvas button we have in the `<Header />`.

The `<Header />` component looks like this:

<details>
<summary>Show Header component code</summary>
<p>

```tsx title="src/components/layout/header/index.tsx"
import React from "react";
import {
  useIsAuthenticated,
  useLogout,
  useMenu,
  useNavigation,
  useParsed,
} from "@refinedev/core";
import { Link } from "react-router-dom";
import { useModalForm } from "@refinedev/antd";

import {
  PlusSquareOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Button, Image, Space } from "antd";

import { CreateCanvas } from "../../../components/canvas";
import { Canvas } from "../../../types";

export const Header: React.FC = () => {
  const { data } = useIsAuthenticated();
  const { mutate: mutateLogout } = useLogout();
  const { push } = useNavigation();
  const { selectedKey } = useMenu();
  const { pathname } = useParsed();

  const { modalProps, formProps, show } = useModalForm<Canvas>({
    resource: "canvases",
    action: "create",
    redirect: "show",
  });

  const isAuthenticated = data?.authenticated;

  const handleRedirect = () => {
    if (!pathname) {
      return push("/login");
    }

    if (pathname === "/") {
      return push("/login");
    }

    push(`/login?to=${encodeURIComponent(pathname)}`);
  };

  return (
    <div className="container">
      <div className="layout-header">
        <Link to="/">
          <Image
            width="120px"
            src="/pixels-logo.svg"
            alt="Pixels Logo"
            preview={false}
          />
        </Link>
        <Space size="large">
          <Link
            to="/"
            className={`nav-button ${selectedKey === "/" ? "active" : ""}`}
          >
            <span className="dot-icon" />
            HOME
          </Link>
          <Link
            to="/canvases"
            className={`nav-button ${
              selectedKey === "/canvases" ? "active" : ""
            }`}
          >
            <span className="dot-icon" />
            NEW
          </Link>
        </Space>
        <Space>
          <Button
            icon={<PlusSquareOutlined />}
            onClick={() => {
              if (isAuthenticated) {
                show();
              } else {
                handleRedirect();
              }
            }}
            title="Create a new canvas"
          >
            Create
          </Button>
          {isAuthenticated ? (
            <Button
              type="primary"
              danger
              onClick={() => {
                mutateLogout();
              }}
              icon={<LogoutOutlined />}
              title="Logout"
            />
          ) : (
            <Button
              type="primary"
              onClick={() => {
                handleRedirect();
              }}
              icon={<LoginOutlined />}
              title="Login"
            >
              Login
            </Button>
          )}
        </Space>
      </div>
      <CreateCanvas modalProps={modalProps} formProps={formProps} />
    </div>
  );
};
```

</p>
</details>

Our `create` action involves the `useModalForm()` hook which manages UI, state, error and data fetching for the `antd` `<Modal />` and `<Form />` components. Let's zoom in on what exactly it is doing.

**The `useModalForm()` Hook**

In the `<Header />` component above, we are invoking the `useModalForm()` hook with its argument object containing `resource`, `action` and `redirect` properties. We are getting the `modalProps` and `formProps` properties that it prepares for us from the response data.

There are loads of things happening here. So I recommend going through the [`useModalForm()` documentation](https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/).

It is also important that we understand how the **Ant Design**
`<Modal />` component accepts the `modalProps` props from [this page](https://ant.design/components/modal#api) and how the `<Form />` works with `formProps` from [here](https://ant.design/components/form#api).

We are using the `<Modal />` and `<Form />` inside the `<CreateCanvas />` component that receives the `modalProps` and `formProps` and relays them to these descendents:

<details>
<summary>CreateCanvas component code</summary>
<p>

```tsx title="src/components/canvas/create.tsx"
import React, { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { Form, FormProps, Input, Modal, ModalProps, Radio } from "antd";

import { getRandomName, DEFAULT_CANVAS_SIZE } from "../../utility";
import { User } from "../../types";

type CreateCanvasProps = {
  modalProps: ModalProps;
  formProps: FormProps;
};

export const CreateCanvas: React.FC<CreateCanvasProps> = ({
  modalProps,
  formProps,
}) => {
  const { data: user } = useGetIdentity<User | null>();

  const [values, setValues] = useState(() => {
    const name = getRandomName();
    return {
      name: name,
      id: name.replace(/\s/g, "-").toLowerCase(),
      width: DEFAULT_CANVAS_SIZE,
      height: DEFAULT_CANVAS_SIZE,
    };
  });

  return (
    <Modal
      {...modalProps}
      title="Create Canvas"
      width={600}
      centered
      afterClose={() => {
        const name = getRandomName();
        setValues({
          name: name,
          id: name.replace(/\s/g, "-").toLowerCase(),
          width: DEFAULT_CANVAS_SIZE,
          height: DEFAULT_CANVAS_SIZE,
        });
      }}
      bodyStyle={{ borderRadius: "6px" }}
    >
      <Form
        {...formProps}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={() => {
          return (
            formProps.onFinish &&
            formProps.onFinish({
              ...values,
              user_id: user?.id,
            })
          );
        }}
      >
        <Form.Item label="ID:">
          <Input value={values.id} disabled />
        </Form.Item>

        <Form.Item label="Name:">
          <Input value={values.name} disabled />
        </Form.Item>

        <Form.Item label="Size:">
          <Radio.Group
            options={[10, 20, 30]}
            onChange={({ target: { value } }) =>
              setValues((p) => ({
                ...p,
                height: value,
                width: value,
              }))
            }
            value={values.width}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
```

</p>
</details>

Notice the use of the `formProps.onFinish()` method on `<Form />`'s `onFinish` prop. This is the form event which initiates the `create` action.

Behind the scenes, `useModalForm()` ultimately calls the `useCreate()` data hook which fetches the data with the `dataProvider.create()` method.

For details about how the `useCreate()` hook works, please refer to [this **Refine** documentation](https://refine.dev/docs/api-reference/core/hooks/data/useCreate/).

Notice also that we are passing the `redirect` property to the `useModalForm()` hook which specifies that we redirect to the `show` action of the resource. We'll come to this in the next section related to adding `show` action in our `canvases` resource.

If we now click on the `Create` button in our navbar, we will be again redirected to the `/login` page.

This is because for the `onClick` event on the `Create` canvas button inside the `<Header />` component, we have asked the router to authenticate the user if they are not logged in:

```tsx title="src/components/layout/header/index.tsx"
<Button
  icon={<PlusSquareOutlined />}
  onClick={() => {
    if (isLogin) {
      show();
    } else {
      handleRedirect();
    }
  }}
  title="Create a new canvas"
>
  Create
</Button>
```

## `<Refine />` `show` Action

We noted in the previous section that after a successful `create` action, `useModalForm()` is set to redirect the page to the `show` action.

The `show` action represents a `GET` request to the `canvases` table in our **Supabase** database. It is done with the `dataProvider.getOne()` method. In the `<CanvasShow />` component, it can be accessed via the `useShow()` hook.

The `<CanvasShow />` component looks like this:

<details>
<summary>CanvasShow component code</summary>
<p>

```tsx title="src/pages/canvases/show.tsx"
import { useState } from "react";
import {
  useCreate,
  useGetIdentity,
  useNavigation,
  useShow,
  useParsed,
  useIsAuthenticated,
} from "@refinedev/core";
import { useModal } from "@refinedev/antd";

import { LeftOutlined } from "@ant-design/icons";
import { Button, Typography, Spin, Modal } from "antd";

import { CanvasItem, DisplayCanvas } from "../../components/canvas";
import { ColorSelect } from "../../components/color-select";
import { AvatarPanel } from "../../components/avatar";
import { colors } from "../../utility";
import { Canvas } from "../../types";
import { LogList } from "../../components/logs";

const { Title } = Typography;

type Colors = typeof colors;

export const CanvasShow: React.FC = () => {
  const { pathname } = useParsed();
  const [color, setColor] = useState<Colors[number]>("black");
  const { modalProps, show, close } = useModal();
  const { data: identity } = useGetIdentity<any>();
  const { data: { authenticated } = {} } = useIsAuthenticated();

  const {
    queryResult: { data: { data: canvas } = {} },
  } = useShow<Canvas>();
  const { mutate } = useCreate();
  const { list, push } = useNavigation();

  const onSubmit = (x: number, y: number) => {
    if (!authenticated) {
      if (pathname) {
        return push(`/login?to=${encodeURIComponent(pathname)}`);
      }

      return push(`/login`);
    }

    if (typeof x === "number" && typeof y === "number" && canvas?.id) {
      mutate({
        resource: "pixels",
        values: {
          x,
          y,
          color,
          canvas_id: canvas?.id,
          user_id: identity.id,
        },
        meta: {
          canvas,
        },
        successNotification: false,
      });
    }
  };

  return (
    <div className="container">
      <div className="paper">
        <div className="paper-header">
          <Button
            type="text"
            onClick={() => list("canvases")}
            style={{ textTransform: "uppercase" }}
          >
            <LeftOutlined />
            Back
          </Button>
          <Title level={3}>{canvas?.name ?? canvas?.id ?? ""}</Title>
          <Button type="primary" onClick={show}>
            View Changes
          </Button>
        </div>
        <Modal
          title="Canvas Changes"
          {...modalProps}
          centered
          destroyOnClose
          onOk={close}
          onCancel={() => {
            close();
          }}
          footer={[
            <Button type="primary" key="close" onClick={close}>
              Close
            </Button>,
          ]}
        >
          <LogList currentCanvas={canvas} />
        </Modal>

        {canvas ? (
          <DisplayCanvas canvas={canvas}>
            {(pixels) =>
              pixels ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 48,
                  }}
                >
                  <div>
                    <ColorSelect selected={color} onChange={setColor} />
                  </div>
                  <CanvasItem
                    canvas={canvas}
                    pixels={pixels}
                    onPixelClick={onSubmit}
                    scale={(20 / (canvas?.width ?? 20)) * 2}
                    active={true}
                  />
                  <div style={{ width: 120 }}>
                    <AvatarPanel pixels={pixels} />
                  </div>
                </div>
              ) : (
                <div className="spin-wrapper">
                  <Spin />
                </div>
              )
            }
          </DisplayCanvas>
        ) : (
          <div className="spin-wrapper">
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};
```

</p>
</details>

In the code above, we have two instances of data hooks in action. First, with the `useShow()` hook, we are getting the created `canvas` data to display it in the grid:

```tsx title="src/pages/canvases/show.tsx"
const {
  queryResult: { data: { data: canvas } = {} },
} = useShow<Canvas>();
```

Additionally, we are letting another `mutation` to create a `pixel` in our `pixels` table with the following:

```tsx title="src/pages/canvases/show.tsx"
const { mutate } = useCreate();

const onSubmit = (x: number, y: number) => {
  if (typeof x === "number" && typeof y === "number" && canvas?.id) {
    mutate({
      resource: "pixels",
      values: { x, y, color, canvas_id: canvas?.id },
    });
  }
};
```

Now that we have our `<CanvasShow />` component ready, let's start implementing **Supabase** authentication for our app.

## Supabase Authentication with Refine

[Refer to the Auth Provider tutorial for more information. →](/docs/authentication/auth-provider)

```tsx title="src/App.tsx"
<Refine
  // ...
  authProvider={authProvider}
/>
```

If we click on the `Create` canvas button, we are redirected to `/login` route.

### Email Authentication with Supabase in Refine

For implementing authentication, we look back at the `App.tsx` file.

**Refine**'s **Supabase** module has produced all the auth page variations we need to register an account, login, recover password and update password - along with the code for routing, `https` requests and authentication providers.

Namely, authentication related routing has been added:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerBindings, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GithubOutlined } from "@ant-design/icons";
import { AuthPage } from "./pages/auth";
import { authProvider } from "./providers";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        // ...
        authProvider={authProvider}
        routerProvider={routerBindings}
      >
        <Routes>
          {/* ... */}
          {/* highlight-start */}
          <Route
            element={
              <Authenticated fallback={<Outlet />}>
                <NavigateToResource />
              </Authenticated>
            }
          >
            <Route
              path="/login"
              element={
                <AuthPage
                  type="login"
                  providers={[
                    {
                      name: "github",
                      icon: (
                        <GithubOutlined
                          style={{
                            fontSize: "18px",
                          }}
                        />
                      ),
                      label: "Sign in with GitHub",
                    },
                  ]}
                />
              }
            />
            <Route path="/register" element={<AuthPage type="register" />} />
            <Route
              path="/forgot-password"
              element={<AuthPage type="forgotPassword" />}
            />
            <Route
              path="/update-password"
              element={<AuthPage type="updatePassword" />}
            />
          </Route>
          {/* highlight-end */}
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

The `LoginPage` route was also added:

```tsx title="src/App.tsx"
<Route
  path="/login"
  element={
    <AuthPage
      type="login"
      providers={[
        {
          name: "github",
          icon: (
            <GithubOutlined
              style={{
                fontSize: "18px",
              }}
            />
          ),
          label: "Sign in with GitHub",
        },
      ]}
    />
  }
/>
```

**Custom Login**

In order to add a custom login route, we add a new `<Route/>` as children to the `<Routes/>` component.

Remember, we've already replaced `App.tx` code with the following:

<details>
<summary>Show `App.tsx` code</summary>
<p>

```tsx title="src/App.tsx"
import { GitHubBanner, Refine, Authenticated } from "@refinedev/core";
import { useNotificationProvider, ErrorComponent } from "@refinedev/antd";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerBindings, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";
import { GithubOutlined } from "@ant-design/icons";

import { Layout } from "./components/layout";
import { CanvasFeaturedList, CanvasList, CanvasShow } from "./pages/canvases";
import { AuthPage } from "./pages/auth";
import { supabaseClient } from "./utility";
import { authProvider, auditLogProvider } from "./providers";

import "@refinedev/antd/dist/reset.css";
import "./styles/style.css";

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
          authProvider={authProvider}
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          auditLogProvider={auditLogProvider}
          routerProvider={routerBindings}
          resources={[
            {
              name: "canvases",
              list: "/canvases",
              show: "/canvases/show/:id",
            },
          ]}
          notificationProvider={useNotificationProvider}
        >
          <Routes>
            <Route
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route index element={<CanvasFeaturedList />} />

              <Route path="/canvases">
                <Route index element={<CanvasList />} />
                <Route path="show/:id" element={<CanvasShow />} />
              </Route>
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    providers={[
                      {
                        name: "github",
                        icon: (
                          <GithubOutlined
                            style={{
                              fontSize: "18px",
                            }}
                          />
                        ),
                        label: "Sign in with GitHub",
                      },
                    ]}
                  />
                }
              />
              <Route path="/register" element={<AuthPage type="register" />} />
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
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
```

</p>
</details>

We are also using a customized version of the [`<AuthPage />`](https://refine.dev/docs/api-reference/antd/components/antd-auth-page/) component now. We will not discuss about customizing the `<AuthPage />` component since it is pretty straight forward. But you can find the updated `<AuthPage />` component in the `src/pages/auth` directory.

If you haven't already, it is definitely worth spending time to go over the `<AuthPage />` customization details [here](https://refine.dev/docs/api-reference/antd/components/antd-auth-page).
<br />

**Registering an Account**

Since we haven't created any account with the `auth.users` table on our **Supabase** server, we need to navigate to the `/register` route where we are presented with the customized sign up form.

At this point, if we register with our email and a password, it gets added to the `auth.users` table in **Supabase**.

After registration, the user is automatically signed in and the browser redirects to the root route, which takes us to the `/canvases` route thanks to **Refine**'s sensible routing defaults.

And now, since we are logged in, we should be able to create a canvas. After successful creation of a canvas, we should be redirected to `/canvases/:id`:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/create-canvas.jpg"  alt="react crud app supabase" />

<br />

Feel free to create a few more canvases and draw on them so that the gallery gets populated.

With the main features functioning now, let's focus on adding and activating third party authentication.

We have a `providers` prop on `<AuthPage />`. We want to add GitHub authentication as well.

### GitHub Authentication with Supabase in Refine

We implemented GitHub authentication with **Supabase** in our app.

In order to do so, we just need to add the following object to the `providers` prop in `<AuthPage />` component:

```json
{
  name: "github",
  icon: <GithubOutlined style={{ fontSize: "18px" }} />,
  label: "Sign in with GitHub",
}
```

In our **Supabase** backend, we have to configure and enable GitHub authentication. Feel free to use this [**Supabase** guide](https://supabase.com/docs/guides/auth/auth-github).

And now we should be able to sign in to our app with GitHub as well.

## Implementing a Public Home Page with Refine

Now it's time to focus on the Home page of our application. We put the `<CanvasFeaturedList />` in this page:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import routerBindings from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "./components/layout";
import { CanvasFeaturedList } from "./pages/canvases";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        // ...
        routerProvider={routerBindings}
      >
        <Routes>
          {/* ... */}
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            {/* highlight-start */}
            <Route index element={<CanvasFeaturedList />} />
            {/* highlight-end */}
            {/* ... */}
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

So, now if we visit the root route we can see the `<CanvasFeaturedList />` component, and not the `<CanvasList />` component.

There will not be any item in the home page because `is_featured` is set to `false` for a canvas by default. At this stage, in order to get a list of featured canvases, we have to set `is_featured: true` from **Supabase** dashboard for some of the canvases created.

I've done that and the featured canvases are listed in the `Home` route:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/featured-canvases.jpg"  alt="react crud app supabase" />

<br />

## Summary

In this post, we added `canvases` resource to our `<Refine />` component. We implemented `list` action on a public gallery and a dashboard page and the `show` action to display a canvas. The `create` action is implemented from inside a modal accessible on a button click. While working through these, we inspected into individual data provider methods and hooks for these actions.

We also saw how **Refine** handles a simple email/password based authentication out-of-the-box. We then went ahead implemented social login using `GitHub` authentication provider.

In the next article, we'll move things to the next level by adding live collaboration features using **Refine**'s **Supabase** `liveProvider`.

[Click here to read "Adding Realtime Collaboration" article. &#8594](https://refine.dev/blog/refine-pixels-4/)
