---
title: Pilot & Refine architecture
description: We'll be taking a look at the architecture of Refine and how week of Refine series will be structured.
slug: refine-pixels-1
authors: abdullah_numan
tags: [refine-week, Refine, supabase, ant-design]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-04-refine-pixels-1/social.png
hide_table_of_contents: false
---

  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-04-refine-pixels-1/refine_supabase.png" alt="refine banner" />

### RefineWeek series

- Day 1 - [Pilot & Refine architecture](https://refine.dev/blog/refine-pixels-1/)
- Day 2 - [Setting Up the Client App](https://refine.dev/blog/refine-pixels-2/)
- Day 3 - [Adding CRUD Actions and Authentication](https://refine.dev/blog/refine-pixels-3/)
- Day 4 - [Adding Realtime Collaboration](https://refine.dev/blog/refine-pixels-4/)
- Day 5 - [Creating an Admin Dashboard with Refine](https://refine.dev/blog/refine-pixels-5/)
- Day 6 - [Implementing Role Based Access Control](https://refine.dev/blog/refine-pixels-6/)
- Day 7 - [Audit Log With Refine](https://refine.dev/blog/refine-pixels-7/)

<br/>
<br/>

This post provides an introduction to [**Refine**](https://github.com/refinedev/refine), a React framework used to rapidly build data heavy CRUD apps like dashboards, admin panels and e-commerce storefronts.

It also presents the [RefineWeek](https://refine.dev/week-of-refine-supabase/) series - which is a seven part quickfire guide that aims to help developers learn the ins-and-outs of [**Refine**](https://github.com/refinedev/refine) and [**Supabase**](https://supabase.com/) powerful capabilities and get going with **Refine** within a week.

At the end of this series, you'll be able to build a fully functional CRUD app named "**Pixels**" with **Refine** and **Supabase**.

[The live version of the app is be available here.](https://pixels.refine.dev/)

The final apps source codes are available on GitHub:

### Pixels Client

[Source Code on GitHub](https://github.com/refinedev/refine/tree/main/examples/pixels)

To get completed client source code simply run:

```
 npm create refine-app@latest -- --example pixels
```

### Pixels Admin

[Source Code on GitHub](https://github.com/refinedev/refine/tree/main/examples/pixels-admin)

To get completed admin source code simply run:

```
 npm create refine-app@latest -- --example pixels-admin
```

## What is **Refine** ?

**Refine** is a highly customizable **React** based framework for building CRUD apps that comes with a headless core package and supplementary "pick-and-plug" modules for the UI, backend API clients and Internationalization support.

**Refine**'s (intentionally decapitalized) core is strongly opinionated about RESTful conventions, HTTPS networking, state management, authentication and authorization. It is, however, unopinionated about the UI and render logic. This makes it customizable according to one's choice of UI library and frameworks.

In a nutshell, you can build rock-solid CRUD apps easily using Refine✨.

## Refine Architecture

Everything in **Refine** is centered around the [`<Refine />`](https://refine.dev/docs/api-reference/core/components/refine-config/) component, which is configured via a set of provider props that each requires a provider object to be passed in. A typical application of providers on the `<Refine />` component looks like this:

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

The above snippet lists a few of the props and their objects.

However, rather than precisely being a component, `<Refine />` is largely a monolith of provider configurations backed by a context for each. Hence, inside [`dataProvider`](https://refine.dev/docs/api-reference/core/providers/data-provider/), we have a standard set of methods for making API requests; inside [`authProvider`](https://refine.dev/docs/api-reference/core/providers/auth-provider/), we have methods for dealing with authentication and authorization; inside [`routerProvider`](https://refine.dev/docs/api-reference/core/providers/router-provider/), we have _exact_ definitions of routes and the components to render for that route, etc. And each provider comes with its own set of conventions and type definitions.

For example, a `dataProvider` object has the following signature to which any definition of a data provider conform:

<details>
<summary>Show data provider code</summary>
<p>

```tsx title="dataProvider.ts"
const dataProvider = {
  create: ({ resource, variables, metaData }) => Promise,
  createMany: ({ resource, variables, metaData }) => Promise,
  deleteOne: ({ resource, id, variables, metaData }) => Promise,
  deleteMany: ({ resource, ids, variables, metaData }) => Promise,
  //highlight-start
  getList: ({ resource, pagination, pagination, sort, filters, meta }) =>
    Promise,
  //highlight-end
  getMany: ({ resource, ids, metaData }) => Promise,
  getOne: ({ resource, id, metaData }) => Promise,
  update: ({ resource, id, variables, metaData }) => Promise,
  updateMany: ({ resource, ids, variables, metaData }) => Promise,
  custom: ({ url, method, sort, filters, payload, query, headers, metaData }) =>
    Promise,
  getApiUrl: () => "",
};
```

</p>
</details>

The underlying architecture involves any presentational component passed to `<Refine />` to be able to consume these configured methods via corresponding hooks. Each method in a provider has a corresponding hook via which a consumer component is able to fetch data from the backend, i.e. the [`useList()`](https://refine.dev/docs/api-reference/core/hooks/data/useList/) hook is the corresponding function accessing the `dataProvider.getList()` provider method.

An example hook usage looks like this:

```tsx title="Inside a UI component"
const { data } = useList<Canvas>({
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

The hooks, in turn, leverage [**React Query**](https://react-query-v3.tanstack.com/) hooks in order to make API calls asked by the provider methods. Here's an early sneak peek into the action under the hood:

<details>
<summary>Show Refine `useList` hook code</summary>
<p>

```tsx
const queryResponse = useQuery<GetListResponse<TData>, TError>(
  queryKey.list(config),
  ({ queryKey, pagination, signal }) => {
    const { pagination, meta, ...restConfig } = config || {};
    return getList<TData>({
      resource,
      ...restConfig,
      pagination,
      meta: {
        ...meta,
        queryContext: {
          queryKey,
          pageParam,
          signal,
        },
      },
    });
  },
  {
    ...queryOptions,
    onSuccess: (data) => {
      queryOptions?.onSuccess?.(data);

      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(data, { metaData, config }, resource)
          : successNotification;

      handleNotification(notificationConfig);
    },
    onError: (err: TError) => {
      checkError(err);
      queryOptions?.onError?.(err);

      const notificationConfig =
        typeof errorNotification === "function"
          ? errorNotification(err, { metaData, config }, resource)
          : errorNotification;

      handleNotification(notificationConfig, {
        key: `${resource}-useList-notification`,
        message: translate(
          "common:notifications.error",
          { statusCode: err.statusCode },
          `Error (status code: ${err.statusCode})`,
        ),
        description: err.message,
        type: "error",
      });
    },
  },
);
```

</p>
</details>

We'll be visiting code like this often, but if you examine closely you can see that **Refine** uses **React Query** to handle caching, state management as well as errors out-of-the-box.

The following diagram illustrates the interactions:

  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-04-refine-pixels-1/refine-flow.png" alt="refine banner" />

<br />

## Providers and Hooks

**Refine**'s power lies in the abstraction of various app component logic such as authentication, authorization, routing and data fetching - inside individual providers and their corresponding hooks.

Common providers include:

- [`authProvider`](https://refine.dev/docs/api-reference/core/providers/auth-provider/) - for authentication and authorization.
- [`dataProvider`](https://refine.dev/docs/api-reference/core/providers/data-provider/) - for CRUD operations.
- [`routerProvider`](https://refine.dev/docs/api-reference/core/providers/router-provider/) - for defining routes, RESTful and non-RESTful.
- [`liveProvider`](https://refine.dev/docs/api-reference/core/providers/live-provider/) - for implementing real time features.
- [`accessControlProvider`](https://refine.dev/docs/api-reference/core/providers/accessControl-provider/) - for access control management.
- [`auditLogProvider`](https://refine.dev/docs/api-reference/core/providers/audit-log-provider/) - for logging appwide activities.

For an exhaustive list of providers, please visit the **Refine** providers documentation from [here](https://refine.dev/docs/api-reference/core/).

Each method in these providers comes with its corresponding hook to be used from inside UI components and pages. For more details, please refer to the **Refine** hooks documentation starting [here](https://refine.dev/docs/api-reference/core/hooks/accessControl/useCan/).

## Support Packages

**Refine** is inherently headless in its core API and deliberately agnostic about the UI and backend layers. Being so, it is able to provide fantastic support for major UI libraries and frameworks as well as popular backend frameworks and services. To name a few, **Refine**'s UI support packages include [**Ant Design**](https://refine.dev/docs/api-reference/antd/), [**Material UI**](https://refine.dev/docs/api-reference/mui/), [**Chakra UI**](https://refine.dev/docs/api-reference/chakra-ui/) and [**Mantine**](https://refine.dev/docs/api-reference/mantine/). Backend supplementary modules include [**Supabase**](https://supabase.com/), [**GraphQL**](https://graphql.org/), and [**NestJS**](https://nestjs.com/)

For a complete list of all these modules, check out [this page](https://refine.dev/docs/packages/list-of-packages/).

## What is Supabase?

[**Supabase**](https://supabase.com/) is an open source alternative to Firebase. It is a hosted backend that provides a realtime database, authentication, storage, and API services.

Refine has a built-in data provider support for Supabase. You can find the advanced tutorial [here](https://refine.dev/docs/packages/documentation/data-providers/supabase/).

We'll be using **Supabase** to build our backend for **Pixels** app.

## A week of Refine ft. Supabase

  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-04-refine-pixels-1/pixel-logo-background.png" alt="refine banner" />

  <br/>
  <br/>

In this tutorial series, we will be going through most of the core features of [**Refine**](https://github.com/refinedev/refine) by building two apps related to drawing pixels on a canvas. This section is intended to provide an overview.

The first one, the client app - **Pixels**, allows a logged in user to create a canvas and draw on it together with other users. It also displays a public gallery of all canvases and a "Featured Canvases" page.

The second app, **Pixels Admin** is an admin dashboard that allows authorized users like `editor`s and `admin`s to view the list of users registered with **Pixels** app and manage user drawn canvases, with actions like promoting, unpromoting and deleting a canvas.

We will be building these two apps day-by-day over a period of 7 days. And while doing so, we will dive deep into the details of related providers, hooks, UI components and how **Refine** works behind the scenes.

As far as our features and functionalities go, we will cover most of the providers and some of the related hooks. For the UI side, we will be using the optional [**Ant Design**](https://refine.dev/docs/api-reference/antd/) package supported by **Refine**. For the backend, we will use a PostgreSQL database hosted on the [**Supabase**](https://supabase.com/) cloud.

<br />

Here are the detailed outlines split per day:

### Day One - On RefineWeek

This post. Hello! :wave: :wave: **Refine** welcomes you! We are here :smile: :smile:

### Day Two - Setting Up the Client App

We start with setting up the **Pixels** client app using `create refine-app`. We choose **Refine**'s optional **Ant Design** and **Supabase** modules as our support packages. After initialization, we explore the boilerplate code created by `create refine-app` and look into the details of the `dataProvider` and `authProvider` objects and briefly discuss their mechanisms.

### Day Three - Adding CRUD Actions & Authentication

On Day Three, we start adding features to our app. We activate the `resources` prop for `<Refine />` and using the `dataProvider` prop, we implement how to create a canvas, show a canvas and draw pixels on a canvas. We add a public gallery to show all canvases in a page and featured canvases in another. We also implement user authentication so that only signed in users can create and draw on a canvas - and while doing so we delve into the `authProvider` object.

Here is a quick sum up of specifications we cover on Day Three:

1. The **Pixels** app has a public gallery.
2. The public gallery has a home page of featured canvases.
3. The public gallery contains a section for all the canvases.
4. All users can view the public gallery.
5. All users can view a canvas.
6. Only logged in users can create a canvas.
7. Only logged in users can draw pixels on a canvas.
8. A user can sign up to the app using email, Google and GitHub.
9. A user can log in to the app using email, Google and GitHub.

### Day Four - Adding Realtime Collaboration

On Day Four, we add **real time** features to our app using the `liveProvider` prop on `<Refine />`. Real time updates on a canvas will facilitate multiple users to collaborate on it at the same time.

We are going to use **Supabase**'s **Realtime** [PostgreSQL CDC](https://supabase.com/docs/guides/realtime/postgres-cdc) in order to perform row level updates on the PostgreSQL database in real time.

### Day Five - Initialize and Build Pixels Admin App

Basing on the learning from the client app, we quickly implement an admin dashboard app and explore how **Refine**'s **Ant Design** support module is geared to rapidly build CRUD pages for a **Refine** app.

Here are the requirements for **Pixels Admin**:

1. Allow a user to sign up to the app using email, Google and GitHub.
2. Allow a user to log in to the app using email, Google and GitHub.
3. Build a dashboard that lists `users` and `canvases`.
4. The dashboard shows a list of all users at `/users` endpoint.
5. The dashboard shows a list of all canvases at `/canvases` endpoint.

### Day Six - Add Role Based Authorization

On Day Six, we implement user role based authorization to our admin app. While doing so, we analyze the `authProvider.getPermissions()` method from the standpoint of implementing authorization and customize according to our needs. We use **Casbin** for implementing a Role Based Access Control model and use it to define the `can` method of the `accessControlProvider` provider.

Here are the features we implement on Day Six:

1. There are two authorized roles for admin dashboard: `editor` and `admin`.
2. An editor is able to promote a canvas to "featured" status and demote it back.
3. An admin is able to promote a canvas to "featured" status and demote it back.
4. An admin is able to delete a canvas.

### Day Seven - Add Audit Log to Client App and Admin App

On the last day, with the `auditLogProvider` prop, we implement a log of all pixel drawing activities.Mutations for drawing pixels will be logged and saved in a `logs` table in our **Supabase** database.

We will display these logs inside a modal for each canvas both in the client **Pixels** app and in the **Pixels Admin** dashboard app. So, we will implement audit logging on both our apps.

## Summary

In this post, we introduced the **Refine** framework and the [RefineWeek](https://refine.dev/week-of-refine/) series itself. We talked about **Refine**'s underlying architecture which consists of providers, hooks and components that help rapidly build internal tools.

We laid out the plans for building a **Pixels** client app and an admin dashboard app in considerable depth.

Tomorrow, on [Day Two](https://refine.dev/blog/refine-pixels-2/), we are ready to start "Setting Up the Client App". See you soon!

[Click here to read "Setting Up the Client App" article. &#8594](https://refine.dev/blog/refine-pixels-2/)
