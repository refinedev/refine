---
title: Build internal tools using Low-Code with Refine, React-based framework
description: Why you should be using low-code app Refine to build internal tools? Learn how to build low-code apps using Refine, React and Ant Design.
slug: build-internal-tools-using-low-code-with-refine
authors: salih
tags: [Refine, react, tutorial]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
---

When it comes to creating internal tools, low-code platforms are the way to go. With Refine, a React-based low-code platform, you can quickly build data-intensive applications without having to worry about scalability or ease of use. Other low-code platforms may allow you to develop your applications, but they are often limited in terms of flexibility and customizability. With Refine, you have full control over your application and can add any business logic that you need. So if you're looking for a platform that will let you build internal tools quickly and easily, Refine is the right choice!

<!--truncate-->

## What is Refine?

Refine is a React-based framework that allows you to build data-intensive applications quickly and with ease. Rapid development and headless at the same time how is it? Well, Refine supports [Ant Design](https://ant.design) for quick and easy solutions. In addition, it allows you to use your design system, or to integrate with other popular design frameworks.

Refer to the [Refine](https://refine.dev) for more information.

## Why you should use Refine?

- It is Open Source under the MIT license.
- Easy to use and it is easy to learn. There are many examples to help you get started, as well as documentation.
- Is a framework that does not require you to use any UI libraries or frameworks.
- Supports Ant Design for quick and easy solutions.
- Backend agnostic, so you can connect to any backend you want.
- Customizable, which means you can change it to fit your needs.
- Refine is fully compatible with server side rendering with [Next.js](https://nextjs.org).

## Features of Refine

Some of the main features of Refine are:

- Data fetching and state management
- Routings
- Authentication
- Authorization
- Internationalization
- Real-time
- Mutation modes with optimistic and pessimistic and undoadable modes

## How does Refine work?

Refine is completely agnostic; just wrap your application with the Refine component and pass the property you need. For example, it takes properties such as `dataProvider` to communicate with the API and `authProvider` to authentication. Then you have hooks that you can use throughout the whole application. These hooks are compatible with [React Query](https://react-query.tanstack.com).

To understand how Refine works, let's explore the following titles:

## Communicate with the API

The `dataProvider` allows communication with the API. All the data fetching and mutations are done through this property.

A data provider must have the following properties:

```tsx
const dataProvider = {
  create: ({ resource, variables, meta }) => Promise,
  createMany: ({ resource, variables, meta }) => Promise,
  deleteOne: ({ resource, id, meta }) => Promise,
  deleteMany: ({ resource, ids, meta }) => Promise,
  getList: ({ resource, pagination, sorters, filters, meta }) => Promise,
  getMany: ({ resource, ids, meta }) => Promise,
  getOne: ({ resource, id, meta }) => Promise,
  update: ({ resource, id, variables, meta }) => Promise,
  updateMany: ({ resource, ids, variables, meta }) => Promise,
};
```

Refine offers hooks to help you with data fetching and mutations using the data provider's properties. For example, when you use the `useTable` or `useList` hook, it will call the `getList` method underneath the hood.

Refer to the [`useTable`](https://refine.dev/docs/ui-frameworks/antd/hooks/table/useTable/) and [data hooks](https://refine.dev/docs/core/hooks/data/useCreate/) for more information.

For example, let's look at what happens when `useTable` is called.

```tsx
import { List, Table, TextField, useTable } from "@refinedev/antd";

interface IPost {
  id: string;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
}

export const PostList: React.FC = () => {
  const { tableProps } = useTable({
    resource: "posts",
    sorters: {
      initial: [
        {
          field: "title",
          order: "asc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "status",
          operator: "eq",
          value: "draft",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="content" title="Content" />
      </Table>
    </List>
  );
};
```

The `useTable` in the example calls the `getList` method of the data provider with the following properties:

```ts
getList({
  resource: "posts",
  pagination: {
    page: 1,
    perPage: 10,
  },
  sorters: [
    {
      field: "title",
      order: "asc",
    },
  ],
  filters: [
    {
      field: "status",
      operator: "eq",
      value: "draft",
    },
  ],
});
```

With `meta` you can pass any parameters that you need to the data provider. You can handle it in the data provider.

All hooks that use data provider methods such as `useTable` work with [React Query](https://react-query.tanstack.com). So you can use all the features of React Query.

Refer to the [`dataProvider`](https://refine.dev/docs/core/providers/data-provider) for more information.

### Out-of-the-box data providers

Refine includes many out-of-the-box data providers to use in your projects like:

- [Simple REST API](https://github.com/refinedev/refine/tree/main/packages/simple-rest)
- [GraphQL](https://github.com/refinedev/refine/tree/main/packages/graphql)
- [NestJS CRUD](https://github.com/refinedev/refine/tree/main/packages/nestjsx-crud)
- [Airtable](https://github.com/refinedev/refine/tree/main/packages/airtable)
- [Strapi](https://github.com/refinedev/refine/tree/main/packages/strapi) - [Strapi v4](https://github.com/refinedev/refine/tree/main/packages/strapi-v4)
- [Supabase](https://github.com/refinedev/refine/tree/main/packages/supabase)
- [Hasura](https://github.com/refinedev/refine/tree/main/packages/hasura)
- [Medusa](https://github.com/refinedev/refine/tree/main/packages/medusa)
- [Appwrite](https://github.com/refinedev/refine/tree/main/packages/appwrite)

## Add routing to the application

Refine needs some router functions to create resource pages, navigation, and so on. It uses the `routerProvider` property to pass the router functions to Refine. In this way, it allows you to use any router library that you want.

If you don't need any customization in your router, we not recommend making this provider. Instead, try `nextjs-router` for your Next.js project and `react-router` or `react-location` for your React project.

Refer to the [`routerProvider`](https://refine.dev/docs/core/providers/router-provider) for more information.

### Out-of-the-box router providers

Refine includes many out-of-the-box data providers to use in your projects like:

- [React Router](https://github.com/refinedev/refine/tree/main/packages/react-router)
- [React Location](https://github.com/refinedev/refine/tree/main/packages/react-location)
- [Next.js Router](https://github.com/refinedev/refine/tree/main/packages/nextjs-router)

## Create pages via `resources`

The main building blocks of a Refine app are `resources`. A resource is an entity in the API's endpoint (e.g., https://api.fake-rest.refine.dev/posts). It connects data from the API with page components, allowing pages to access data from the API.

```tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/json-server";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const App: React.FC = () => {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
          show: PostShow,
        },
      ]}
    />
  );
};

export default App;
```

Each resource component is assigned a route by Refine. The `/posts` route, for example, displays the list page of the `posts` resource, which is implemented using the `PostList` component. The `PostCreate` component is the create page of the `posts` resource and it is rendered by the `/posts/create` route. The `PostEdit` component is the edit page of the `posts` resource and it is rendered by the `/posts/edit/:id` route. The `PostShow` component is the show page of the `posts` resource and it is rendered by the `/posts/show/:id` route.

Refine hooks used in these pages read some values from the route by default. For example, `useForm` hook takes the `resource`, `action`, and `id` from the route by default.

## Authentication

The `authProvider` allows you to add authentication your application. You can use any authentication library that you want. All your authentication logic is managed with this `authProvider`.

A auth provider must have the following properties:

```tsx
const authProvider = {
  login: () => Promise,
  logout: () => Promise,
  checkAuth: () => Promise,
  checkError: () => Promise,
  getPermissions: () => Promise,
  getUserIdentity: () => Promise,
};
```

Refine uses these methods via [authorization hooks](https://refine.dev/docs/core/hooks/auth/useLogin/). Authentication and authorization procedures such as login, logout, checking user credentials, and catching HTTP errors are all handled using authorization hooks. For example, `checkAuth`is called when the user tries to access a page that requires authentication.

Refer to the [`authProvider`](https://refine.dev/docs/core/providers/auth-provider) for more information.

### Out-of-the-box Auth providers

- Auth0 - [Source Code](https://github.com/refinedev/refine/tree/main/examples/auth-auth0/) - [Demo](https://refine.dev/docs/examples/auth-provider/auth0)
- Keycloak - [Source Code](https://github.com/refinedev/refine/tree/main/examples/auth-keycloak/) - [Demo](https://refine.dev/docs/examples/auth-provider/keycloak)
- Google - [Source Code](https://github.com/refinedev/refine/tree/main/examples/auth-google-login) - [Demo](https://refine.dev/docs/examples/auth-provider/google-auth)
- OTP Login - [Source Code](https://github.com/refinedev/refine/tree/main/examples/auth-otp) - [Demo](https://refine.dev/docs/examples/auth-provider/otpLogin)

## Authorization

Refine provides `accessControlProvider` that you can use to control who has access to what in your app. You can use any access control library that you want. In addition, you can choose the access control models that work best for you (RBAC, ABAC, ACL, etc.).

An `accessControlProvider` must have one async method called `can` to check if the person asking for access is allowed to have it.

```tsx
type CanParams = {
    resource: string;
    action: string;
    params?: any;
};

type CanReturnType = {
    can: boolean;
    reason?: string;
}

const accessControlProvider = {
    can: ({ resource, action, params }: CanParams) => Promise<CanReturnType>;
}
```

[`useCan`](https://refine.dev/docs/core/hooks/accessControl/useCan) and [`<CanAccess>`](https://refine.dev/docs/core/components/accessControl/can-access/) component use this method to check if the user is allowed to access.

For example, we can stop non-admin users from editing the post resource.

```tsx
const App: React.FC = () => {
  <Refine
    accessControlProvider={{
      can: async ({ resource, action, params }) => {
        if (resource === "posts" && action === "edit") {
          const userRole = getUserRole();

          if (userRole === "admin") {
            return { can: true };
          }

          return Promise.resolve({
            can: false,
            reason: "Unauthorized",
          });
        }

        return Promise.resolve({ can: true });
      },
    }}
  />;
};
```

Refer to the [`accessControlProvider`](https://refine.dev/docs/core/providers/accessControl-provider) for more information.

### Out-of-the-box access control providers

- Casbin - [Source Code](https://github.com/refinedev/refine/tree/main/examples/access-control-casbin) - [Demo](https://codesandbox.io/embed/github/refinedev/refine/tree/main/examples/access-control-casbin)
- Cerbos - [Source Code](https://github.com/refinedev/refine/tree/main/examples/access-control-cerbos) - [Demo](https://codesandbox.io/embed/github/refinedev/refine/tree/main/examples/access-control-cerbos)

## Internationalization

The `i18nProvider` is used to give localization features to your application. This will allow you to change the text in your application to different languages.

An i18n provider must have the following properties:

```ts
const i18nProvider = {
  translate: (key: string, params: object) => string,
  changeLocale: (lang: string) => Promise,
  getLocale: () => string,
};
```

Refine uses these methods via [translation hooks](https://refine.dev/docs/core/hooks/translate/useTranslate/).

Refer to [Refine i18nProvider](https://refine.dev/docs/core/providers/i18n-provider) for more details and how to use the [react-i18next](https://react.i18next.com) package.

## Real-time support

The `liveProvider` is used to add real-time support to your application. You can use any real-time library or tool that you want.

A live provider must have the following properties:

```tsx
const liveProvider = {
    subscribe: ({ channel, params: { ids }, types, callback }) => any,
    unsubscribe: (subscription) => void,
    publish?: (event) => void,
};
```

Refine data hooks are subscribed to using the subscribe method given with the live provider. The subscribe method returns a subscription object that can be used to unsubscribe. The unsubscribe method is used to unsubscribe from the subscription. The publish method is used to publish an event to the channel on the client side.

If you send an event after the relevant operations on the server, Refine will invalidate the related queries. If the `liveMode` is `manual`, queries of related resources are not invalidated in real-time; instead `onLiveEvent` is run with the event as new events from the subscription arrive.

### Out-of-the-box access control providers

- Ably - [Source Code](https://github.com/refinedev/refine/blob/main/packages/ably/src/index.ts) - [Demo](https://codesandbox.io/embed/github/refinedev/refine/tree/main/examples/live-provider-ably)
- Supabase - [Source Code](https://github.com/refinedev/refine/blob/main/packages/supabase/src/index.ts#L187)
- Appwrite - [Source Code](https://github.com/refinedev/refine/blob/main/packages/appwrite/src/index.ts#L252)

## Other features of Refine

### `notificationProvider`

The `notificationProvider` is used to display notifications to the user when mutations are performed. You can use any notification library that you want.

### `mutationMode`

The `mutationMode` is used to determine how to handle mutations. You can use `pessimistic` `optimistic` or `undoable` mode. When using the pessimistic mode, UI updates are delayed until the mutation is confirmed by the server. When using the optimistic mode, UI updates are immediately updated. When using the undoable mode, UI updates are immediately updated, but you can undo the mutation.

### `syncWithLocation`

If `syncWithLocation` is turned on, the list of query parameters may be modified manually by editing directly in the URL.

```
/posts?current=1&pageSize=8&sort[]=createdAt&order[]=desc
```

<br/>

Check out all of Refine's [features](https://refine.dev/docs/core/components/refine-config) for more information.

## Conclusion

If you're looking for a way to quickly and easily create an internal tool without sacrificing customization, Refine is worth checking out. It allows you to choose any library that you want for your requirements. Plus, if you need help or have feedback, the team at Refine is responsive and happy to help out. Give [Refine](https://github.com/refinedev/refine) a star on GitHub if you like it - your support will help us continue making this tool amazing!
