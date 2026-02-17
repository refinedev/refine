---
title: "Refine Pixels: A Complete Guide to Building Full-Stack Apps"
description: "Build a production-ready app from scratch with the Refine Pixels series, covering auth, CRUD, state management, realtime collaboration, admin dashboards, RBAC, and audit logging."
slug: refine-pixels-guide
authors: abdullah_numan
tags: [refine, supabase, ant-design, tutorial, admin-panel]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-04-refine-pixels-1/social.png
hide_table_of_contents: false
---

This comprehensive guide consolidates the complete Refine Pixels series into one resource. You'll learn how to build a production-ready collaborative drawing application from scratch using [Refine](https://github.com/refinedev/refine), [Supabase](https://supabase.com/), and [Ant Design](https://ant.design/). By the end of this guide, you'll have mastered authentication, CRUD operations, realtime collaboration, admin dashboards, role-based access control, and audit logging.

## What You'll Build

We'll create two interconnected applications:

**Pixels Client** - A collaborative drawing app where users can create canvases and draw together in real time

- Live demo: [pixels.refine.dev](https://pixels.refine.dev/)
- [Source code on GitHub](https://github.com/refinedev/refine/tree/main/examples/pixels)

**Pixels Admin** - An admin dashboard for managing users and canvases

- [Source code on GitHub](https://github.com/refinedev/refine/tree/main/examples/pixels-admin)

To get the completed source code, run:

```bash
# For the client app
npm create refine-app@latest -- --example pixels

# For the admin app
npm create refine-app@latest -- --example pixels-admin
```

## What is Refine?

[Refine](https://github.com/refinedev/refine) is a highly customizable React-based framework for building CRUD apps that comes with a headless core package and supplementary "pick-and-plug" modules for the UI, backend API clients, and internationalization support.

Refine's (intentionally decapitalized) core is strongly opinionated about RESTful conventions, HTTPS networking, state management, authentication, and authorization. It is, however, unopinionated about the UI and render logic. This makes it customizable according to one's choice of UI library and frameworks.

In a nutshell, you can build rock-solid CRUD apps easily using Refine ✨.

## Refine Architecture

Everything in Refine is centered around the [`<Refine />`](https://refine.dev/core/docs/api-reference/core/components/refine-config/) component, which is configured via a set of provider props that each requires a provider object to be passed in. A typical application of providers on the `<Refine />` component looks like this:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
import { liveProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";

<Refine
  dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
  routerProvider={routerProvider}
  liveProvider={liveProvider(supabaseClient)}
  authProvider={authProvider}
  resources={[]}
  ...
/>;
```

Rather than precisely being a component, `<Refine />` is largely a monolith of provider configurations backed by a context for each. Inside [`dataProvider`](https://refine.dev/core/docs/api-reference/core/providers/data-provider/), we have a standard set of methods for making API requests, inside [`authProvider`](https://refine.dev/core/docs/api-reference/core/providers/auth-provider/), we have methods for dealing with authentication and authorization, inside [`routerProvider`](https://refine.dev/core/docs/api-reference/core/providers/router-provider/), we have exact definitions of routes and the components to render for that route, and so on. Each provider comes with its own set of conventions and type definitions.

For example, a `dataProvider` object has the following signature:

<details>
<summary>Show data provider code</summary>
<p>

```tsx title="dataProvider.ts"
const dataProvider = {
  create: ({ resource, variables, meta }) => Promise,
  createMany: ({ resource, variables, meta }) => Promise,
  deleteOne: ({ resource, id, variables, meta }) => Promise,
  deleteMany: ({ resource, ids, variables, meta }) => Promise,
  getList: ({ resource, pagination, pagination, sort, filters, meta }) =>
    Promise,
  getMany: ({ resource, ids, meta }) => Promise,
  getOne: ({ resource, id, meta }) => Promise,
  update: ({ resource, id, variables, meta }) => Promise,
  updateMany: ({ resource, ids, variables, meta }) => Promise,
  custom: ({ url, method, sort, filters, payload, query, headers, meta }) =>
    Promise,
  getApiUrl: () => "",
};
```

</p>
</details>

The underlying architecture involves any presentational component passed to `<Refine />` to be able to consume these configured methods via corresponding hooks. Each method in a provider has a corresponding hook via which a consumer component is able to fetch data from the backend. For example, the [`useList()`](https://refine.dev/core/docs/data/hooks/use-list/) hook is the corresponding function accessing the `dataProvider.getList()` provider method.

An example hook usage looks like this:

```tsx title="Inside a UI component"
const { result } = useList<Canvas>({
  resource: "canvases",
  pagination: {
    mode: "off",
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
```

The hooks leverage [React Query](https://react-query-v3.tanstack.com/) hooks in order to make API calls requested by the provider methods. Refine uses React Query to handle caching, state management, and errors out-of-the-box.

Here's how the data flow works:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-04-refine-pixels-1/refine-flow.png" alt="Refine data flow diagram" />

<br />

## Providers and Hooks

Refine's power lies in the abstraction of various app component logic such as authentication, authorization, routing, and data fetching inside individual providers and their corresponding hooks.

Common providers include:

- [`authProvider`](https://refine.dev/core/docs/api-reference/core/providers/auth-provider/) - for authentication and authorization
- [`dataProvider`](https://refine.dev/core/docs/api-reference/core/providers/data-provider/) - for CRUD operations
- [`routerProvider`](https://refine.dev/core/docs/api-reference/core/providers/router-provider/) - for defining routes, RESTful and non-RESTful
- [`liveProvider`](https://refine.dev/core/docs/api-reference/core/providers/live-provider/) - for implementing real time features
- [`accessControlProvider`](https://refine.dev/core/docs/api-reference/core/providers/accessControl-provider/) - for access control management
- [`auditLogProvider`](https://refine.dev/core/docs/api-reference/core/providers/audit-log-provider/) - for logging app-wide activities

For an exhaustive list of providers, please visit the [Refine providers documentation](https://refine.dev/core/docs/api-reference/core/).

Each method in these providers comes with its corresponding hook to be used from inside UI components and pages. For more details, please refer to the [Refine hooks documentation](https://refine.dev/core/docs/api-reference/core/hooks/accessControl/useCan/).

## Support Packages

Refine is inherently headless in its core API and deliberately agnostic about the UI and backend layers. Being so, it is able to provide fantastic support for major UI libraries and frameworks as well as popular backend frameworks and services. Refine's UI support packages include [Ant Design](https://refine.dev/core/docs/api-reference/antd/), [Material UI](https://refine.dev/core/docs/api-reference/mui/), [Chakra UI](https://refine.dev/core/docs/api-reference/chakra-ui/), and [Mantine](https://refine.dev/core/docs/api-reference/mantine/). Backend supplementary modules include [Supabase](https://supabase.com/), [GraphQL](https://graphql.org/), and [NestJS](https://nestjs.com/).

For a complete list of all these modules, check out [the packages documentation](/core/docs/packages/list-of-packages/).

## What is Supabase?

[Supabase](https://supabase.com/) is an open source alternative to Firebase. It is a hosted backend that provides a realtime database, authentication, storage, and API services.

Refine has built-in data provider support for Supabase. You can find the advanced tutorial [here](https://refine.dev/core/docs/packages/documentation/data-providers/supabase/).

We'll be using Supabase to build our backend for the Pixels app.

## Part 1: Setting Up the Client App

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-04-refine-pixels-1/pixel-logo-background.png" alt="Pixels app logo banner" />

<br/>
<br/>

Let's initialize our Pixels app using Refine and get familiar with the boilerplate code created by the `create refine-app` CLI tool.

### Project Setup

For this project, we're using a PostgreSQL database hosted in the Supabase cloud. Refine comes with an optional package for Supabase that gives us `dataProvider` and `authProvider` out-of-the-box for handling requests for CRUD actions, authentication, and authorization against models hosted in a Supabase server.

We'll include Refine's Ant Design package for the UI side.

Let's use the `create refine-app` CLI tool to interactively initialize the project:

```bash
npm create refine-app@latest pixels
```

Choose the following options:

```bash
✔ Choose a project template · Refine(Vite)
✔ What would you like to name your project?: · pixels
✔ Choose your backend service to connect: · Supabase
✔ Do you want to use a UI Framework?: · Ant Design
✔ Do you want to add example pages?: · no
✔ Do you need i18n (Internationalization) support?: · no
✔ Choose a package manager: · npm
```

This creates a rudimentary Refine app that supports Ant Design in the UI and Supabase in the backend. In our `package.json`, we can see that Refine's optional packages for Ant Design and Supabase are added:

```json title="package.json"
"dependencies": {
  "@refinedev/antd": "^5.7.0",
  "@refinedev/core": "^4.5.8",
  "@refinedev/react-router-v6": "^4.1.0",
  "@refinedev/supabase": "^5.0.0",
}
```

We're going to use Ant Design components for our UI thanks to the `@refinedev/antd` module. The `@refinedev/supabase` module allows us to use Refine's Supabase auth and data providers.

Let's build the app and check what we have in the browser:

```bash
npm run dev
```

Navigate to `http://localhost:5173` and you'll see a Refine welcome screen.

### Exploring the App

Our main focus is the `src` folder, especially the `<App />` component. Inside the `App.tsx` file, we can see a `<Refine />` component with various props:

```tsx title="src/App.tsx"
import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerProvider, {
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
            routerProvider={routerProvider}
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

:::caution

[`<Refine />`](https://refine.dev/core/docs/api-reference/core/components/refine-config/) comes with [dark mode support](/core/docs/ui-integrations/ant-design/theming/#theme-customization) out-of-the-box. However, we won't be using it in this series. We'll replace the `ColorModeContextProvider` with the `ConfigProvider`. You can also remove `src/context/color-mode` that comes with `create refine-app`.

```diff title="src/App.tsx"
// ...
- import { ColorModeContextProvider } from "./contexts/color-mode";
+ import { ConfigProvider } from "antd";

function App() {
    return (
        // ...
-       <ColorModeContextProvider>
+       <ConfigProvider>
            <Refine
            // ...
            >
                {/* ... */}
            </Refine>
-       </ColorModeContextProvider>
+       </ConfigProvider>
        // ...
    );
}
```

:::

### The `<Refine />` Component

The [`<Refine />`](https://refine.dev/core/docs/api-reference/core/components/refine-config/) component is the entry point of a Refine app. In order to leverage the power of Refine's abstraction layers, we need to configure the `<Refine />` component with the provider objects we want to use in our app.

The `create refine-app` tool already added the props for us. Some provider objects like the `routerProvider` or the `dataProvider` are defined by Refine's core or support modules, and some like the `accessControlProvider` have to be defined by ourselves.

### The `dataProvider` Prop

[Refine's data provider](https://refine.dev/core/docs/data/data-provider) is the context which allows the app to communicate with a backend API via an HTTP client. It makes response data returned from HTTP requests available to consumer components via a set of Refine data hooks.

Our `dataProvider` prop derives a value from a call to `dataProvider(supabaseClient)`:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "./utility";

function App() {
  return <Refine dataProvider={dataProvider(supabaseClient)} />;
}
```

Since we're using the [`@refinedev/supabase`](https://github.com/refinedev/refine/tree/main/packages/supabase) package, `dataProvider={dataProvider(supabaseClient)}` makes a full data provider object available to us with methods for all CRUD operations.

### The `supabaseClient`

Inside `src/utility/`, we have a `supabaseClient.ts` file containing the credentials of a client that provides us access to a Supabase backend:

```tsx title="src/utility/supabaseClient.ts"
import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://ifbdnkfqbypnkmwcfdes.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmYmRua2ZxYnlwbmttd2NmZGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA5MTgzOTEsImV4cCI6MTk4NjQ5NDM5MX0.ThQ40H-xay-Hi5cf7H9mKccMCvAX3iCvYVJDe0KiHtw";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
```

This file was generated by `create refine-app` using Refine's Supabase package. Inside the `<Refine />` component, we're getting the value of the `dataProvider` prop by passing `supabaseClient` to the `dataProvider()` function imported from this package.

We need to update the `supabaseClient.ts` file with our own credentials from Supabase.

### The `authProvider` Prop

The `authProvider` object was created by `create refine-app` inside the `authProvider.ts` file. This object has all the methods we need to implement an email/password-based authentication and authorization system in our app.

<details>
<summary>Show Refine Supabase auth provider source code</summary>
<p>

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";
import { supabaseClient } from "../utility";

export const authProvider: AuthProvider = {
  login: async ({ email, password, providerName }) => {
    try {
      // sign in with oauth
      if (providerName) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
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
      const { data, error } = await supabaseClient.auth.signInWithPassword({
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
        return {
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
  register: async ({ email, password }) => {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
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
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  forgotPassword: async ({ email }) => {
    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/update-password`,
        },
      );

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
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
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },
  updatePassword: async ({ password }) => {
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          redirectTo: "/",
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
        message: "Update password failed",
        name: "Invalid password",
      },
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/",
    };
  },
  onError: async (_error: any) => ({}),
  check: async () => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      const { session } = data;

      if (!session) {
        return {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Session not found",
          },
          logout: true,
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error,
        logout: true,
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    try {
      const user = await supabaseClient.auth.getUser();

      if (user) {
        return user.data.user?.role;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  },
  getIdentity: async () => {
    try {
      const { data } = await supabaseClient.auth.getUser();

      if (data?.user) {
        return {
          ...data.user,
          name: data.user.email,
        };
      }

      return null;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
};
```

</p>
</details>

Notice that `authProvider` relies on `supabaseClient` to connect to our Supabase database. Although Refine performs and manages a lot of heavy lifting by dividing concerns into separate contexts, providers, and hooks, configuring all these providers is important work itself.

## Part 2: Adding CRUD Actions and Authentication

Now let's build on our existing understanding of `dataProvider` and `authProvider` to implement CRUD operations in our Pixels app. We'll discuss the roles of the `resources` and `routerProvider` props as well.

### Setting Up Supabase

First, we need to set up Supabase with our database tables.

#### 1. Creating a PostgreSQL Server

Creating a database server is intuitive in Supabase. Go to your organization's dashboard and create a server. For the quickstart guide, follow [this link](https://supabase.com/docs/guides/with-react#create-a-project).

#### 2. Adding Tables

For our app, we have four tables: `auth.users`, `public.users`, `canvases`, and `pixels`. The entity relational diagram for our database looks like this:

<div className="centered-image">
  <img style={{alignSelf:"center"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-09-refine-pixels-3/supabase_Table.png" alt="Supabase table editor" />
</div>

<br/>
<br />

**`auth.users` Table**

The `auth.users` table is concerned with authentication in our app. It's created by Supabase as part of its authentication module, so we don't need to do anything about it.

**`public.users` Table**

Supabase doesn't allow a client to query the `auth.users` table for security reasons. So we need to create a shadow of the `auth.users` table in `public.users` with additional columns. Run this SQL script in the SQL Editor of your Supabase project dashboard:

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
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');
```

**`canvases` Table**

For the `canvases` table, run this SQL script:

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

**`pixels` Table**

For the `pixels` table, run this:

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

**Disable RLS**

For simplicity, we'll disable Row Level Security from the Supabase dashboard.

#### 3. Set Up `supabaseClient`

Now it's time to use the Supabase hosted database server inside our Refine app. Get the access credentials from the Supabase dashboard by following [this section](https://supabase.com/docs/guides/with-react#get-the-api-keys).

Store these credentials in a `.env` file:

```bash title=".env"
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_KEY=YOUR_SUPABASE_KEY
```

Update the `supabaseClient.ts` file:

```tsx title="src/utility/supabaseClient.ts"
import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY ?? "";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
```

The `<Refine />` component's `dataProvider`, `authProvider`, and `liveProvider` objects utilize this `supabaseClient` to connect to the PostgreSQL server hosted on Supabase.

### Adding Resources

To add a resource to our app, we introduce the [`resources`](https://refine.dev/core/docs/guides-concepts/general-concepts/#resource-concept) prop to `<Refine />`. The value of the `resources` prop should be an array of resource items with RESTful routes:

```tsx title="App.tsx"
<Refine
  // ...
  resources={[
    {
      name: "canvases",
      list: "/canvases",
      show: "/canvases/show/:id",
    },
  ]}
/>
```

Refine simplifies CRUD actions and acts as a bridge between the Data/API layer and the Document/Page layer. A resource enables the application's pages to interact with the API.

For the above `canvases` resource, the `name` property denotes the name of the resource. Behind the scenes, Refine automatically adds RESTful routes for the actions defined on a resource name to the `routerProvider` object.

The `list` and `show` properties represent the CRUD actions we want, and their values are the components we want to render when we navigate to their respective RESTful routes.

### Adding Required Files

Before we move on, you need to add required pages and components to the project. The finalized version is available at: https://github.com/refinedev/refine/tree/main/examples/pixels

Add the following to your project:

- pages: https://github.com/refinedev/refine/tree/main/examples/pixels/src/pages
- components: https://github.com/refinedev/refine/tree/main/examples/pixels/src/components
- providers: https://github.com/refinedev/refine/tree/main/examples/pixels/src/providers
- utility: https://github.com/refinedev/refine/tree/main/examples/pixels/src/utility
- types: https://github.com/refinedev/refine/tree/main/examples/pixels/src/types
- styles: https://github.com/refinedev/refine/tree/main/examples/pixels/src/styles
- assets: https://github.com/refinedev/refine/tree/main/examples/pixels/public

After creating these files, replace your `App.tsx` with the following:

<details>
<summary>Show App.tsx code</summary>
<p>

```tsx title="App.tsx"
import { GitHubBanner, Refine, Authenticated } from "@refinedev/core";
import { useNotificationProvider, ErrorComponent } from "@refinedev/antd";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
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
          routerProvider={routerProvider}
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

After creating files above, you can remove `src/authProvider` and `src/components/header` that comes with `create refine-app`. We've moved these files to `src/providers/authProvider.ts` and `src/components/layout/header` for better folder structure.

:::

### Implementing the List Action

The `list` action represents a `GET` request sent to the `canvases` table in our Supabase database. It's done through the `dataProvider.getList` method. From the consumer component, it can be accessed via the `useList()` hook.

Refine defines the routes for the `list` action to be the `/canvases` path and adds it to the `routerProvider` object. The `/canvases` path renders the `<CanvasList />` component.

The contents of our `<CanvasList />` component look like this:

```tsx title="src/pages/canvases/list.tsx"
import { useSimpleList } from "@refinedev/antd";
import { List, Skeleton } from "antd";

import { CanvasTile } from "../../components/canvas";
import { SponsorsBanner } from "../../components/banners";
import { Canvas } from "../../types";

export const CanvasList: React.FC = () => {
  const { listProps, query } = useSimpleList<Canvas>({
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

  const { isLoading } = query;

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

**Using Ant Design with Refine**

We're using the Ant Design [`<List />`](https://ant.design/components/list#list/) component to show the list of canvases. The `<List />` component takes in the props inside the `listProps` object that the `useSimpleList()` hook prepares for us from the fetched canvases array.

**The `useSimpleList()` Hook**

The `useSimpleList()` is a `@refinedev/antd` hook built on top of the low level [`useList()`](https://refine.dev/core/docs/data/hooks/use-list/) hook to fetch a resource collection. After fetching data according to the value of the `resource` property, it prepares it according to the `listProps` of Ant Design's `<List />` component.

For more information, visit the [`useSimpleList` documentation](https://refine.dev/core/docs/api-reference/antd/hooks/list/useSimpleList/).

**Sorting**

Notice that we can pass options for `pagination` and `sorters.initial` for the API call and get the response accordingly.

### Public Routes in Refine

Our goal is to allow unauthenticated users to view created canvases. However, they won't have the ability to create, update, or delete canvases.

If we revisit the `authProvider` object, we can see that the `check()` method only allows logged in users. We use this logic to compose our routes.

Refine provides the [`<Authenticated/>`](/core/docs/authentication/components/authenticated/) component to protect routes from unauthenticated users. It uses `authProvider.check` method under the hood. To use this component, we wrap the routes we want to protect with the `<Authenticated/>` component.

In our routes implementation, we didn't wrap our `canvases` resource routes with `<Authenticated/>`. This means we can access the `canvases` resource routes without being authenticated. However, we use `login`, `register`, `forgot-password`, and `update-password` routes as a `fallback` of the `<Authenticated/>` component, meaning we cannot access these routes if we're authenticated.

### Implementing the Create Action

The `create` action represents a `POST` request sent to the `canvases` table in our Supabase database. It's done with the `dataProvider.create()` method.

We're presenting the canvas form inside a modal contained in a `<CreateCanvas />` component, which is placed in the `<Header />` component. The modal is accessed with a Create canvas button in the `<Header />`.

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

**The `useModalForm()` Hook**

In the `<Header />` component above, we're invoking the `useModalForm()` hook with its argument object containing `resource`, `action`, and `redirect` properties. We're getting the `modalProps` and `formProps` properties that it prepares for us from the response data.

The `useModalForm()` hook manages UI, state, error, and data fetching for the `antd` `<Modal />` and `<Form />` components. For more information, visit the [`useModalForm()` documentation](https://refine.dev/core/docs/api-reference/antd/hooks/form/useModalForm/).

We use the `<Modal />` and `<Form />` inside the `<CreateCanvas />` component that receives the `modalProps` and `formProps` and relays them to these descendants.

Notice the use of the `formProps.onFinish()` method on `<Form />`'s `onFinish` prop. This is the form event which initiates the `create` action. Behind the scenes, `useModalForm()` ultimately calls the `useCreate()` data hook which fetches the data with the `dataProvider.create()` method.

After a successful `create` action, `useModalForm()` is set to redirect the page to the `show` action.

### Implementing the Show Action

The `show` action represents a `GET` request to the `canvases` table in our Supabase database. It's done with the `dataProvider.getOne()` method. In the `<CanvasShow />` component, it can be accessed via the `useShow()` hook.

The `<CanvasShow />` component renders at `/canvases/show/:id` and displays a canvas where users can draw pixels.

<details>
<summary>Show CanvasShow component code</summary>
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
    query: { data: { data: canvas } = {} },
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

In the code above, we have two instances of data hooks in action. First, with the `useShow()` hook, we're getting the created `canvas` data to display it. Additionally, we're creating a `pixel` in our `pixels` table with the `useCreate()` hook.

### Implementing Authentication

For authentication, we're using Supabase's built-in authentication system. The authentication routes were already added by `create refine-app`.

**Email Authentication**

Since we haven't created any account yet, we need to navigate to the `/register` route where we're presented with the sign up form. After registration, the user is automatically signed in.

**GitHub Authentication**

We've also implemented GitHub authentication. In our Supabase backend, we need to configure and enable GitHub authentication. Follow [this Supabase guide](https://supabase.com/docs/guides/auth/auth-github) to set it up.

Now if we click on the Create button in our navbar and we're not logged in, we're redirected to the `/login` page. After logging in, we can create a canvas and draw pixels on it.

## Part 3: Adding Realtime Collaboration

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/live-provider.avif" alt="Live provider implementation for real-time updates" />

<br />

Now let's implement realtime broadcast and subscription of pixels updates in our Pixels app. We'll do this with the [`liveProvider`](https://refine.dev/core/docs/api-reference/core/providers/live-provider/) prop on `<Refine />` and [Supabase's Realtime servers](https://supabase.com/docs/guides/realtime).

Real time updates on a canvas will facilitate multiple users to collaborate on it at the same time. We'll use Supabase's Realtime [PostgreSQL CDC](https://supabase.com/docs/guides/realtime/postgres-cdc) to perform row level updates on the PostgreSQL database in real time.

### Setting Up Supabase Realtime

In order to make drawing collaborative between our users, we have to run Supabase Realtime servers and create channels for our `pixels` resource.

From the Supabase dashboard, select `Enable Realtime` for the `pixels` table from its editor:

<div className="centered-image">
   <img style={{alignSelf:"center"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-11-refine-pixels-4%2Frealtime.png" alt="Supabase realtime data synchronization diagram" />
</div>

<br/>

Behind the scenes, Supabase spins up globally distributed Realtime servers that facilitate low latency communication between our app and Supabase database tables. Supabase's Realtime feature spares a channel for each resource to be broadcasted. Any change in the resource is published in the channel, and clients that subscribe to the channel receive updates as soon as the change is made.

We're using Supabase Realtime's [PostgreSQL Change Data Capture](https://supabase.com/docs/guides/realtime#postgres-cdc) feature which will now allow our app to publish mutation events to the `pixels` channel and also listen to those changes from a subscriber component.

This means mutation hooks such as [`useCreate()`](https://refine.dev/core/docs/data/hooks/use-create/) can now publish events to the `pixels` channel, and consumer hooks like [`useList()`](https://refine.dev/core/docs/data/hooks/use-list/) are able to get instant updates for any change to `pixels`.

### The `liveProvider` Prop

We already have the `liveProvider` prop passed in with the `liveProvider()` function from `@refinedev/supabase`:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { liveProvider } from "@refinedev/supabase";
import { supabaseClient } from "./utility";

function App() {
  return (
    <Refine
      // ...
      liveProvider={liveProvider(supabaseClient)}
    />
  );
}
```

And that's it! The channel for the `pixels` resource that was specified above in Supabase will broadcast all mutations on the `pixels` table. And any subscriber will be able to receive real time updates about the changes.

Now let's try opening the app in two browsers, one with a Google account and one with GitHub. Navigate to a canvas page, the same one in both, and try adding some pixels from each. We'll see that pixels created in one are displayed in the other in real time.

### How It Works

**Refine**'s `liveProvider` object has the following signature:

```tsx
const liveProvider = {
  subscribe: ({ channel, params: { ids }, types, callback }) => any,
  unsubscribe: (subscription) => void,
  publish?: (event) => void,
};
```

Both `subscribe` and `unsubscribe` methods are concerned with subscription to the changes. Publishing the event is done by mutation methods. In our case, it's done from the [`useCreate()`](/core/docs/data/hooks/use-create/) hook we invoke to create a pixel.

**Broadcasting**

Inside our `<CanvasShow />` component that is rendered at `/canvases/:id`, we have a `<CanvasItem />` component which displays all pixels that belong to the canvas item being visited. `<CanvasItem />` is also the component from where a pixel is created.

The most relevant thing is the `onPixelClick` click event handler, which is a prop received by the `<CanvasItem />` from the `<CanvasShow />` component. Its original value is the `onSubmit()` function defined inside the `<CanvasShow />` component.

This `onSubmit` event handler is what facilitates the creation of a pixel:

```tsx title="src/pages/canvases/show.tsx"
import { useCreate, useNavigation } from "@refinedev/core";

export const CanvasShow: React.FC = () => {
  // ...

  const { push } = useNavigation();
  const { mutate } = useCreate();

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

  return /* ... */;
};
```

With the call to the `mutate` method of the `useCreate()` hook, a new entry is being added to the `pixels` table upon every click on the canvas. And since we enabled realtime for the `pixels` table, each successful `create` action broadcasts the change to the `pixels` channel for subscribers to pick up.

Behind the scenes, `useCreate()` uses the live `usePublish()` hook to publish the `created` event to the `pixels` channel on Supabase Realtime servers.

**Subscription**

The changes to the `pixels` table can be subscribed by consumer components with the `useList()` hook. We're showing the pixels inside the `<CanvasShow />` component itself, but they're fetched inside the `<DisplayCanvas />` render-props component.

The `useList()` hook inside `<DisplayCanvas />` looks like this:

```tsx title="src/components/canvas/display.tsx"
import React, { ReactElement } from "react";
import { useList } from "@refinedev/core";

import { Canvas } from "../../types/canvas";
import { Pixel } from "../../types/pixel";

type DisplayCanvasProps = {
  canvas: Canvas;
  children: (pixels: Pixel[] | undefined) => ReactElement;
};

export const DisplayCanvas: React.FC<DisplayCanvasProps> = ({
  canvas: { id },
  children,
}) => {
  const { result } = useList<Pixel>({
    resource: "pixels",
    liveMode: "auto",
    meta: {
      select: "*, users(id, full_name, avatar_url)",
    },
    filters: [
      {
        field: "canvas_id",
        operator: "eq",
        value: id,
      },
    ],
    sorters: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
    pagination: {
      mode: "off",
    },
  });

  const pixels = result?.data;

  return <>{children(pixels)}</>;
};
```

Among the arguments passed to the `useList()` hook, we have used the `liveMode: auto` property which allows us to subscribe to the Realtime channel for the `pixels` resource.

With `liveProvider` activated, under the hood, `useList()` banks on Refine's `useResourceSubscription()` live hook to communicate with the `pixels` channel. The actual subscription is done by the `liveProvider.subscribe()` method called from inside the `useResourceSubscription()` hook.

With this, we have enabled multiple users to draw on a canvas at the same time and receive updates instantly.

## Part 4: Creating an Admin Dashboard

Now let's build a **Pixels Admin** app, an admin dashboard that allows authorized users like editors and admins to view the list of users registered with the Pixels app and manage user-drawn canvases.

### Project Setup

Let's initialize our admin app with `create refine-app`:

```bash
npm create refine-app@latest pixels-admin
```

Choose the following options:

```bash
✔ Choose a project template · Refine(Vite)
✔ What would you like to name your project?: · pixels-admin
✔ Choose your backend service to connect: · Supabase
✔ Do you want to use a UI Framework?: · Ant Design
✔ Do you want to add example pages?: · no
✔ Do you need i18n (Internationalization) support?: · no
✔ Choose a package manager: · npm
```

After completion, navigate to the project folder and run the dev server:

```bash
npm run dev
```

### Setting Up Supabase Config

For the admin app, we'll connect to the same PostgreSQL database already running on Supabase for the Pixels client app.

Store the credentials in an `.env` file and update the `supabaseClient.ts` file:

```tsx title="src/utility/supabaseClient.ts"
import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY ?? "";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
```

### Adding Required Files

The finalized version is available at: https://github.com/refinedev/refine/tree/main/examples/pixels-admin

Add the following to your project:

- pages: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/pages
- components: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/components
- providers: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/providers
- utility: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/utility
- casbin: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/casbin
- types: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/src/types
- assets: https://github.com/refinedev/refine/tree/main/examples/pixels-admin/public

:::danger Important

In order to run the app without warnings, you need to follow the Casbin RBAC system installation step (Browser Fallbacks for Casbin) described below.

:::

After creating these files, replace your `App.tsx` with the following:

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
  ThemedLayout,
  useNotificationProvider,
} from "@refinedev/antd";
import { ConfigProvider } from "antd";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerProvider, {
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
          routerProvider={routerProvider}
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
                  <ThemedLayout Title={Title}>
                    <CanAccess>
                      <Outlet />
                    </CanAccess>
                  </ThemedLayout>
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
                  <ThemedLayout>
                    <Outlet />
                  </ThemedLayout>
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

[`<Refine />`](/core/docs/core/refine-component/) comes with [dark mode support](/core/docs/ui-integrations/ant-design/theming/#switching-to-dark-theme) out-of-the-box. However, we're not using it in this series. After copying `App.tsx`, you'll see that we've already replaced `ColorModeContextProvider` with the `ConfigProvider`. You can also remove `src/context/color-mode` that comes with `create refine-app`.

:::

### Creating a Table View

Our `<UserList />` component uses the `useTable()` hook, which is a Refine Ant Design hook served from the `@refinedev/antd` package:

```tsx
const { tableProps } = useTable<TUser>();
```

`useTable()` is built on top of Refine core's [`useMany()`](https://refine.dev/core/docs/data/hooks/use-many/) data hook, which invokes the [`getMany()`](https://refine.dev/core/docs/api-reference/core/providers/data-provider/#getmany) data provider method.

The properties of the `tableProps` object are intended to be passed to a `<Table />` component:

```tsx
<Table {...tableProps} rowKey="id">
  // React nodes here...
</Table>
```

**Refine Ant Design `<List />` Component**

The [`<List />`](https://refine.dev/core/docs/api-reference/antd/components/basic-views/list/) component represents a list view. It's a wrapper around the contents of the list. In our case, we don't have to pass in any prop because Refine figures the `resource` name and `title` from the `resources` prop.

**Refine Ant Design `<Table />` Component**

[`useTable()`](https://refine.dev/core/docs/api-reference/antd/hooks/table/useTable/) hook's `tableProps` is specifically configured to match the props of Ant Design's native `<Table />` component.

Besides passing in the `tableProps` object to `<Table />`, we're required to provide a unique `rowKey` prop to identify each row in the table. The records inside `tableProps` are placed inside `<Table.Column />`s of a row of the table, one record per row.

### Editable Table

For our `<CanvasList />` view, we want to allow editors and admins to promote or delete a canvas item. This means we need to be able to send `POST`, `PUT`/`PATCH`, and `DELETE` requests. The `@refinedev/antd` `useEditableTable()` hook makes this easy for us.

The `useEditableTable()` hook is the extension of `@refinedev/antd`'s `useTable()` hook. It returns a `formProps` object that we can pass to `<Form />` components to handle form actions, loading, and displaying success and error messages.

```tsx
const { tableProps, formProps } = useEditableTable<TCanvas>();
```

The items of the `formProps` object are passed to the `<Form />` component:

```tsx
<Form {...formProps}>// React nodes here...</Form>
```

**Refine Ant Design `<DeleteButton />`**

Thanks to the `formProps` being passed to `<Form />`, implementing the `delete` action becomes simple:

```tsx
<DeleteButton size="small" recordItemId={record.id} />
```

The `@refinedev/antd` `<DeleteButton />` leverages Ant Design's `<Button />` and `<Popconfirm />` components. It invokes the `delete()` data provider method to send a `DELETE` request to the resource endpoint.

## Part 5: Implementing Role Based Access Control

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/can-access-disabled.jpg" alt="Delete buttons disabled for editor role" />

<br />

Now let's implement Role Based Access Control (RBAC) on our Pixels Admin app. We'll have two roles that seek authorization: `editor` and `admin`. An `editor` is allowed to only promote and unpromote a canvas, whereas an `admin` is free to promote/unpromote a canvas as well as delete it.

Here are the specifications:

1. `editor` can promote and unpromote a canvas
2. `editor` cannot perform any other action
3. `admin` can promote and unpromote a canvas
4. `admin` can delete a canvas
5. `admin` cannot perform any other action

We'll manage RBAC and authorization using [Casbin](https://casbin.org/docs/overview) models and policies. We'll then make use of Refine's `accessControlProvider` and associated hooks to enforce policies for these roles.

For the backend, we'll set and store user roles with the help of Supabase Custom Claims. Supabase Custom Claims are a handy mechanism to store user roles information on the `auth.users` table.

### Casbin with Refine

In this app, we're implementing a Role Based Access Control model with Casbin.

If you're not familiar with Casbin, please read through [how it works](https://casbin.org/docs/how-it-works). For a complete beginner, I recommend understanding the following sections in the Casbin docs:

1. [Get Started](https://casbin.org/docs/get-started)
2. [How It Works](https://casbin.org/docs/how-it-works)
3. [Supported Models](https://casbin.org/docs/supported-models)
4. [Syntax for Models](https://casbin.org/docs/syntax-for-models)
5. [RBAC](https://casbin.org/docs/rbac)

#### Casbin Installation

```bash
npm install casbin
```

**Browser Fallbacks for Casbin**

We need to configure polyfills for Vite to work in a browser environment. First, install required packages:

```bash
npm install -D rollup-plugin-polyfill-node @esbuild-plugins/node-modules-polyfill @esbuild-plugins/node-globals-polyfill
```

Then add the following to the `vite.config.ts` file:

```tsx title="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});
```

#### Casbin Model and Policies

We're using the following `model` and policy `adapter` for our RBAC implementation:

```tsx title="src/casbin/accessControl.ts"
import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
  [request_definition]
  r = sub, obj, act

  [policy_definition]
  p = sub, obj, act

  [role_definition]
  g = _, _

  [policy_effect]
  e = some(where (p.eft == allow))

  [matchers]
  m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
  p, admin, users, list
  p, admin, canvases, (list)|(edit)|(delete)

  p, editor, users, list
  p, editor, canvases, (list)|(edit)
`);
```

The `adapter` holds our instances of policies. The policies above basically allow:

- an `admin` to `list` users
- an `admin` to `list`, `edit`, and `delete` canvases
- an `editor` to `list` users
- an `editor` to `list` and `edit` canvases

### The `accessControlProvider`

The `accessControlProvider` is responsible for enforcing authorization on every request sent from the app. Looking at the `<App />` component, we can see that it's passed to the `<Refine />` component:

```tsx title="src/App.tsx"
<Refine accessControlProvider={accessControlProvider} />
```

**Refine `can` Method**

The `accessControlProvider` implements only one method named `can`. Basic implementation of the `can` method looks like this:

```tsx title="src/providers/accessControlProvider.ts"
import { newEnforcer } from "casbin";
import { CanParams, CanReturnType } from "@refinedev/core";
import { adapter, model } from "../casbin/accessControl";

export const accessControlProvider = {
  can: async ({ resource, action }: CanParams): Promise<CanReturnType> => {
    const enforcer = await newEnforcer(model, adapter);
    const can = await enforcer.enforce("admin", resource, action);

    return Promise.resolve({
      can,
    });
  },
};
```

We're initializing a Casbin `Enforcer` with the `model` and `adapter`. We want this `enforcer` to enforce the policies with its accepted arguments. At the end, we get the Boolean decision based on the model's policy effect.

From inside a component, the `accessControlProvider.can` method will be invoked via the [`useCan()` hook](https://refine.dev/core/docs/api-reference/core/hooks/accessControl/useCan/).

With this code, if we set the first argument of `enforcer.enforce()` to `"editor"`, we can see that the Delete button on each row gets disabled when we visit `/canvases`.

This is because our `editor` policies do not allow a `delete` action on the `canvases` resource, so the Delete button is disabled.

The Delete button gets disabled because `@refinedev/antd`'s special buttons like the `<DeleteButton />` are enabled or disabled based on the result of access control enforcement.

### User Permissions with Supabase

In Refine, user roles are fetched by `authProvider`'s `getPermissions()` method. The default `getPermissions` method in `authProvider` looks like this:

```tsx title="src/providers/authProvider.ts"
getPermissions: async () => {
  const user = await supabaseClient.auth.getUser();

  if (user) {
    return user.data.user?.role;
  }

  return null;
};
```

However, Supabase itself does not support setting user roles to users in the `auth.users` table. So it's not possible to set `editor` and `admin` roles we need for our designated users.

One way to implement this is with [Supabase Custom Claims](https://github.com/supabase-community/supabase-custom-claims).

#### Setting Up User Roles with Supabase Custom Claims

Supabase Custom Claims is a community contribution that enables setting additional data to the access token that a user receives from Supabase. These claims are stored in the `auth.users.raw_app_meta_data` field and are sent to the client with the access token.

Here are two crucial particulars on how they work:

- Only a user with a `{ claims_admin: true }` claim can set claims data on others. So we need to bootstrap a `claims_admin` role for a first user using the Supabase SQL Editor.
- Our app can access the getter and setter functions via Supabase Remote Procedure Calls (RPCs) with the `supabaseClient.rpc()` method.

**Installing Custom Claims Functions**

Let's start with installing the custom claims SQL functions. Copy, paste, and run the [install.sql](https://github.com/supabase-community/supabase-custom-claims/blob/main/install.sql) script in your Supabase SQL Editor.

Take note of the function named `get_my_claims()`. This SQL function will help us remotely get user roles for our app.

**Bootstrapping Claims Admin Role**

We then have to bootstrap a `claims_admin` role because only users with `{ claims_admin: true }` can set claims data for other users. In the Supabase SQL Editor, run the following query:

```sql
select set_claim('designated-user-uuid', 'claims_admin', 'true');
```

This will allow the user with id `designated-user-uuid` to set roles for other users from inside our app.

We can also set other data from the SQL Editor, such as the role itself. Let's use the following SQL query to set roles for some of our designated users:

```sql
select set_claim('designated-user-uuid', 'role', '"editor"');
select set_claim('another-designated-user-uuid', 'role', '"admin"');
```

#### Refine `getPermissions()` with Supabase Custom Claims

Here's the adjusted `getPermissions()` method:

```tsx title="src/providers/authProvider.ts"
getPermissions: async () => {
    try {
        const { error } = await supabaseClient.auth.getUser();

        if (error) {
            console.error(error);
            return;
        }

        const { data } = await supabaseClient.rpc("get_my_claim", {
            claim: "role",
        });

        return data;
    } catch (error: any) {
        console.error(error);
        return;
    }
},
```

Here, we're using the `supabaseClient.rpc()` method to call the `get_my_claims` SQL function remotely.

#### Refine `can` Method for Supabase Custom Roles

Now we can finalize our `can` method with `role` received from `authProvider.getPermissions()`:

```tsx title="src/providers/accessControlProvider.ts"
import { newEnforcer } from "casbin";
import { CanParams, CanReturnType } from "@refinedev/core";

import { adapter, model } from "../casbin/accessControl";
import { authProvider } from "./authProvider";

export const accessControlProvider = {
  can: async ({ resource, action }: CanParams): Promise<CanReturnType> => {
    const role = await authProvider.getPermissions?.();

    const enforcer = await newEnforcer(model, adapter);
    const can = await enforcer.enforce(role, resource, action);

    return Promise.resolve({
      can,
    });
  },
};
```

Earlier, we set `admin` and `editor` roles for a few designated users using the Supabase SQL Editor. Now, logging into their respective accounts will display the dashboard with Casbin policies applied.

In the `/canvases` route, an `editor` account should have the Delete buttons disabled because we don't have it in our policies. In contrast, it's enabled for an `admin` role.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/can-access-enabled.jpg" alt="Delete buttons enabled for admin role" />

<br />

### Low Level Inspection

If we dig into the `@refinedev/antd` package for the `<DeleteButton />` component, we can see that the `useCan()` hook is used to decide the authorization status:

```tsx title="node_modules/@refinedev/antd/src/components/buttons/delete/index.ts"
export const DeleteButton: React.FC<DeleteButtonProps> = (
  {
    // ...
  },
) => {
  // ...

  const { data } = useCan({
    resource: resourceName,
    action: "delete",
    params: { id, resource },
    queryOptions: {
      enabled: accessControlEnabled,
    },
  });

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  // ...
};
```

Since authorization comes baked in with `<DeleteButton />`, we didn't have to worry about it in our case.

## Part 6: Audit Log With Refine

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/client-audit-log.jpg" alt="Client audit log table" />

<br />

Finally, let's apply Refine's built-in audit logging functionality to our Pixels Admin app and the Pixels client app. Refine's audit logging system comes already baked into its data hooks and inside supplemental data provider packages like [`@refinedev/supabase`](https://www.npmjs.com/package/@refinedev/supabase).

We'll get it to work by using the `auditLogProvider` prop. We'll store the log entries in a `logs` table in our Supabase database.

### The `logs` Table

We need to set up the `logs` table from the Supabase dashboard. Let's first figure out the columns we need for the table. The table should have as columns the properties of the log `params` object emitted by a mutation.

**Refine's Log Params Object**

A successful resource `create` action makes the following log `params` object available to the `auditLogProvider.create()` method:

```tsx
{
  "action": "create",
  "resource": "pixels",
  "data": {
    "id": "1",
    "x": "3",
    "y": "3",
    "color": "cyan",
  },
  "meta": {
    "dataProviderName": "Google",
    "id": "1"
  }
}
```

This object should be passed to the audit log provider's `create` method to create a new record in the `logs` table.

Likewise, the `update` and `delete` actions of a resource emit an object with similar, overlapping variations.

It's important not to confuse a resource `create` action with that of the `auditLogProvider`. The resource `create` action is carried out by the `dataProvider.create()` method and produces the log `params` object. The `auditLogProvider.create()` method consumes the `params` object and creates an entry in the `logs` table.

**The `meta` Object**

Notice the `meta.id` property on the log `params` object above. It represents the `id` of the resource item on which the event was created.

It's possible to append useful data to the `meta` field by passing the data to the `meta` object when the mutation is invoked from a hook. For example, we can add the `canvas` property to the `meta` object inside the argument passed to the `mutate` function of the `useCreate()` hook:

```tsx
const { mutate } = useCreate();

mutate({
  resource: "pixels",
  values: { x, y, color, canvas_id: canvas?.id, user_id: identity.id },
  meta: {
    canvas,
  },
});
```

And it will be included in the log `params` object's `meta` field. Properties inside the `meta` object are handy for filtering `get` requests to the `logs` table.

Notice also the `author` property. It's added when a user is authenticated. Otherwise, it's excluded.

**The `logs` Table**

Emanating from the log params object above, our `logs` table looks like this:

<div className="centered-image">
  <img style={{alignSelf:"center"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-20-refine-pixels-7%2Fdiagram.png" alt="Audit log flow diagram" />
</div>

<br/>

Let's create this table from our Supabase dashboard before we move forward and start working on the `auditLogProvider` methods.

### The `auditLogProvider` Object

The `auditLogProvider` object should have three methods. It has the following type signature:

```tsx
const auditLogProvider = {
  create: (params: {
    resource: string;
    action: string;
    data?: any;
    author?: {
      name?: string;
      [key: string]: any;
    };
    previousData?: any;
    meta?: Record<string, any>;
  }) => void;
  get: (params: {
    resource: string;
    action?: string;
    meta?: Record<string, any>;
    author?: Record<string, any>;
    meta?: MetaDataQuery;
  }) => Promise<any>;
  update: (params: {
    id: BaseKey;
    name: string;
  }) => Promise<any>;
};
```

Based on this, our `auditLogProvider` looks like this:

```tsx title="src/providers/auditLogProvider.ts"
import { AuditLogProvider } from "@refinedev/core";
import { dataProvider } from "@refinedev/supabase";

import { supabaseClient } from "../utility";

export const auditLogProvider: AuditLogProvider = {
  get: async ({ resource, meta }) => {
    const { data } = await dataProvider(supabaseClient).getList({
      resource: "logs",
      filters: [
        {
          field: "resource",
          operator: "eq",
          value: resource,
        },
        {
          field: "meta->canvas->id",
          operator: "eq",
          value: `"${meta?.canvas?.id}"`,
        },
      ],
      sort: [{ order: "desc", field: "created_at" }],
    });

    return data;
  },
  create: (params) => {
    return dataProvider(supabaseClient).create({
      resource: "logs",
      variables: params,
    });
  },
  update: async ({ id, name }) => {
    const { data } = await dataProvider(supabaseClient).update({
      resource: "logs",
      id,
      variables: { name },
    });

    return data;
  },
};
```

**`create`**

The `create` method is very straightforward. It just takes the log `params` object sent when the log event was emitted and adds an entry to the `logs` table. It's called when any of the three mutation actions, namely `create`, `update`, and `delete`, is completed successfully.

**`update`**

The `update` method is similar. Our implementation allows updating the `name` of the log item.

**`get`**

The `get` method is the most significant of the three, especially with the use of the `meta` argument. We're using the `dataProvider.getList()` method to query the `logs` table.

Then inside the `filters` array, we're first filtering `log` records with the `resource` field and then with the nested embedded field of `meta->canvas->id`. The `canvas` property will be appended to the `meta` field of the log `params` object by passing the `canvas` to the `meta` object of the argument passed to the mutation method of the `useCreate()` data hook.

When we want to query the `logs` table, we'll use the `useLogList()` audit log hook that consumes the `get()` method. The `meta?.canvas?.id` comes from the `meta` argument passed to `useLogList()`.

### Audit Logging with Refine

To enable audit logging feature in our app, we first pass the `auditLogProvider` prop to `<Refine />`:

```tsx title="App.tsx"
<Refine
  // ...
  auditLogProvider={auditLogProvider}
/>
```

This makes all database mutations emit a log event and send the log `params` object towards the `auditLogProvider.create()` method. Mutations that emit an event are `create()`, `update()`, and `delete()` methods of the `dataProvider` object.

When these methods are consumed from components using corresponding hooks, and given the `logs` table is set up properly, a successful mutation creates an entry in the `logs` table.

**Audit Log `create` Action**

In the Pixels app, `pixels` are created by the `onSubmit()` event handler defined inside the `<CanvasShow />` component. The `mutate()` function being invoked inside the `onSubmit()` handler is destructured from the `useCreate()` hook. We know that audit logging has been activated for the `useCreate()` hooks, so a successful `pixels` creation sends the `params` object to `auditLogProvider.create` method.

Notice that we're passing the `currentCanvas` as `meta.canvas`, which we expect to be populated inside the `meta` property of the log `params` object. As we'll see below, we're going to use it to filter our `GET` request to the `logs` table using the `useLogList()` hook.

**Audit Log List with Refine**

We're going to display the `pixels` log list for a canvas in the `<LogList />` component. In the Pixels app, it's contained in the `<CanvasShow />` page and housed inside a modal accessible by clicking on the View Changes button. The `<LogList />` component uses the `useLogList()` hook to query the `logs` table:

```tsx title="src/components/logs/list.tsx"
import { useLogList } from "@refinedev/core";
import { Avatar, List, Typography } from "antd";

import { formattedDate, timeFromNow } from "../../utility/time";

type TLogListProps = {
  currentCanvas: any;
};

export const LogList = ({ currentCanvas }: TLogListProps) => {
  const { data } = useLogList({
    resource: "pixels",
    meta: {
      canvas: currentCanvas,
    },
  });

  return (
    <List
      size="small"
      dataSource={data}
      renderItem={(item: any) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src={item?.author?.user_metadata?.avatar_url} size={20} />
            }
          />
          <Typography.Text style={{ fontSize: "12px" }}>
            <strong>{item?.author?.user_metadata?.email}</strong>
            {` ${item.action}d a pixel on canvas: `}
            <strong>{`${item?.meta?.canvas?.name} `}</strong>
            <span style={{ fontSize: "10px", color: "#9c9c9c" }}>
              {`${formattedDate(item.created_at)} - ${timeFromNow(
                item.created_at,
              )}`}
            </span>
          </Typography.Text>
        </List.Item>
      )}
    />
  );
};
```

If we examine closely, the `meta` property of the argument object passed to the `useLogList()` hook contains the `canvas` against which we want to filter the `logs` table. If we revisit the `auditLogProvider.get` method, we can see that the `value` field of the second filter corresponds to this canvas.

We're doing this to make sure that we're getting only the logs for the current canvas.

With this completed, if we ask for the modal in the CanvasShow page, we should be able to see the pixels log list.

We don't have a case for creating a pixel in the Pixels Admin app. But we can go ahead and implement the same pixels `<LogList />` component for each `canvas` item in the `<CanvasList />` page at `/canvases`. The code is essentially the same, but the View Changes button appears inside each row in the table.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/admin-audit-log.jpg" alt="Admin audit log table" />

<br />

## Summary

In this comprehensive guide, we built a complete collaborative drawing application using Refine, Supabase, and Ant Design. We covered:

**Part 1: Setting Up the Client App**

- Initialized the Pixels app using `create refine-app`
- Explored Refine's architecture with providers and hooks
- Set up Supabase as our backend

**Part 2: Adding CRUD Actions and Authentication**

- Set up Supabase database with tables for users, canvases, and pixels
- Implemented list, show, and create actions for canvases
- Added email and GitHub authentication

**Part 3: Adding Realtime Collaboration**

- Enabled Supabase Realtime for the pixels table
- Implemented the `liveProvider` for real-time updates
- Allowed multiple users to draw on a canvas simultaneously

**Part 4: Creating an Admin Dashboard**

- Built a Pixels Admin app for managing users and canvases
- Used `useTable()` and `useEditableTable()` hooks for table views
- Implemented editable tables with delete functionality

**Part 5: Implementing Role Based Access Control**

- Set up Casbin for RBAC with editor and admin roles
- Configured `accessControlProvider` with Casbin policies
- Used Supabase Custom Claims for storing user roles

**Part 6: Audit Log With Refine**

- Created a logs table in Supabase
- Implemented `auditLogProvider` for tracking pixel creation
- Used `useLogList()` hook to display audit logs

Throughout this guide, we've explored Refine's powerful capabilities and learned how it simplifies building complex CRUD applications. We've seen how Refine abstracts various app component logic inside individual providers and allows their methods to be easily accessed and executed with hooks from consumer components.

The combination of Refine's headless architecture, Supabase's backend services, and Ant Design's UI components has enabled us to build a production-ready collaborative drawing application with authentication, authorization, real-time features, and audit logging.

## FAQ

### What is Refine and why should I use it?

Refine is a React-based framework for rapidly building data-heavy CRUD applications like admin panels, dashboards, and internal tools. It provides a headless core with strong opinions about RESTful conventions, state management, and authentication, while remaining flexible about UI implementation. You should use Refine when you need to build CRUD apps quickly without reinventing common patterns for data fetching, authentication, and authorization.

### Can I use Refine with other backends besides Supabase?

Yes! Refine supports 15+ backend integrations including REST API, GraphQL, NestJS, Strapi, Hasura, and many more. The `dataProvider` pattern allows you to easily switch between backends or even use multiple backends in the same application.

### Can I use a different UI framework instead of Ant Design?

Absolutely. Refine is headless at its core and provides support packages for multiple UI frameworks including Material UI, Mantine, Chakra UI, and you can even use it with headless mode to build your own custom UI.

### How does Refine handle state management?

Refine uses React Query under the hood for data fetching and state management. This provides automatic caching, background updates, and optimistic updates out of the box. You don't need to manually manage loading states, error states, or cache invalidation.

### Is the real-time feature limited to Supabase?

No, Refine's `liveProvider` is designed to work with various real-time solutions. While we used Supabase Realtime in this guide, you can implement the `liveProvider` interface with other solutions like Ably, Pusher, or Socket.io.

### How can I customize the authentication flow?

The `authProvider` is completely customizable. You can implement any authentication method by defining the `login`, `logout`, `check`, `getPermissions`, and `getIdentity` methods. This guide showed email/password and OAuth authentication, but you can implement JWT, session-based auth, or any other authentication mechanism.

### Can I use Refine for applications other than admin panels?

Yes! While Refine excels at building admin panels and dashboards, it can be used for any CRUD application including e-commerce storefronts, CMS platforms, inventory management systems, and more. The Pixels app we built is an example of a public-facing collaborative application.

### How does Refine's RBAC compare to other solutions?

Refine's `accessControlProvider` is flexible and works with any authorization library. In this guide, we used Casbin, but you can integrate with other solutions like Cerbos, Permify, or implement your own custom logic. The key advantage is that access control is checked consistently across the application through hooks like `useCan()`.

### Is audit logging only for database mutations?

While our example focused on database mutations (create, update, delete), you can extend the `auditLogProvider` to log any events in your application, including user navigation, searches, exports, or custom business logic events.

### How do I deploy a Refine application?

Refine applications are standard React applications and can be deployed to any platform that supports React apps, including Vercel, Netlify, AWS, Azure, or your own servers. The deployment process is the same as deploying any React application built with Vite or Create React App.

### Where can I get help if I'm stuck?

You can reach out to the Refine team or join the [Refine Discord channel](https://discord.gg/refine) to learn more, ask questions, and connect with the community. The [official documentation](https://refine.dev/docs/) is also comprehensive and regularly updated.
