---
title: How to Create Full Stack React/Next.JS Web App in Few Hour
description: In this article, we will learn how we can create a full-featured customizable Web / B2B application with **refine** in just a few hours.
slug: create-full-stack-app-with-refine
authors: melih
tags: [refine, react, nextjs, tutorial]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-04-29-create-full-stack-app/social.jpg
hide_table_of_contents: false
---


:::caution

This post was created using version 3.x.x of **refine**. Although we plan to update it with the latest version of **refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

:::







We frequently require quick development and sometimes flexibility while developing a Full Stack application. Aside from speed and flexibility, we must establish the application architecture correctly at the start so that we are not subjected to any more needless work throughout the development process.

In this article, we will use the **refine** framework to develop a full stack application. **Refine** will provide us with the speed and flexibility we are looking for, while assisting with the overall project architecture during web application development.

## What is Refine?

**refine** is a React-based framework for rapid building of internal tools. It's is a a collection of helper `hooks`, `components` and `providers`. They are all decoupled from your UI components and business logic, so they never keep you from customizing your UI or coding your own flow.

Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to `admin panels`, `B2B` applications and `dashboards`.

## Why Should Use Refine?

**refine** offers you almost everything you need while developing an `Admin Panel`, `Dashboard`, `B2B` or `B2C` application, with many features it provides. It does not limit you in situations that may arise during project development and offers you the opportunity to customize it.

With the Data Provider feature it provides, you don't need to think about your API or GraphQL queries and write extra queries! Thanks to Refine hooks, you can easily fetching the data in your database and manage your state structure. In addition to quickly fetch and manage your data, you can easily design your UI with [Ant Design](https://ant.design/) and [Material UI (comming soon)](https://mui.com/) ready components used as out-of-the-box by **refine**.

**refine** is a `headless` React framework. It can be used independently of the UI. You can easily use all the features of refinement with any UI library.

### Key features​

🔥 Headless : Works with any UI framework

⚙️ Zero-configuration : One-line setup with superplate. It takes less than a minute to start a project.

📦 Out-of-the-box : Routing, networking, authentication, state management, i18n and UI.

🔌 Backend Agnostic : Connects to any custom backend. Built-in support for REST API, GraphQL, NestJs CRUD, Airtable, Strapi, Strapi v4, Strapi GraphQL, Supabase, Hasura, Nhost, Appwrite, Firebase, and Directus.

📝 Native Typescript Core : You can always opt out for plain JavaScript.

🐜 Enterprise UI : Works seamlessly with Ant Design System. (Support for multiple UI frameworks is on the Roadmap)

📝 Boilerplate-free Code : Keeps your codebase clean and readable.

To learn more about **refine** features, we recommend that you read the [Overview](/docs/) document.

### Benchmark

**refine**, by removing unnecessary repetition in your code, reduces number of lines of code and makes it easier to maintain. Below is a size comparison for an example project:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/getting-started/benchmark.png" alt="Refine Benchmark" />
</div>
<br />

## Create Full Stack App

As we mentioned above, you can easily handle any API and GraphQL queries without writing extra code thanks to the **refine** [Data Provider](/docs/api-reference/core/providers/data-provider/) hooks. If you do not have a custom backend, you can choose one of the following backend providers that work in harmony with **refine**.

**refine** includes many out-of-the-box data providers to use in your projects like:

-   [Airtable](https://github.com/refinedev/refine/tree/master/packages/airtable)
-   [Appwrite](https://github.com/refinedev/refine/tree/master/packages/appwrite)
-   [GraphQL](https://github.com/refinedev/refine/tree/master/packages/graphql)
-   [Hasura](https://github.com/refinedev/refine/tree/master/packages/hasura)
-   [NestJS CRUD](https://github.com/refinedev/refine/tree/master/packages/nestjsx-crud)
-   [Nhost](https://github.com/refinedev/refine/tree/master/packages/nhost)
-   [Simple REST API](https://github.com/refinedev/refine/tree/master/packages/simple-rest)
-   [Strapi](https://github.com/refinedev/refine/tree/master/packages/strapi)
-   [Strapi GraphQL](https://github.com/refinedev/refine/tree/master/packages/strapi-graphql)
-   [Strapi v4](https://github.com/refinedev/refine/tree/master/packages/strapi-v4)
-   [Supabase](https://github.com/refinedev/refine/tree/master/packages/supabase)
-   [Medusa](https://github.com/refinedev/refine/tree/master/packages/medusa)

[Refer to the `dataProvider` documentation for detailed usage. &#8594](/docs/api-reference/core/providers/data-provider/)

You can develop a full-featured web application by using any your custom backend or the above backend providers with **refine**.

Check out the Full Stack application examples created with **refine** and out-of-the-box data providers:

-   [E-commerce Example](/blog/handcrafted-nextjs-e-commerce-app-tutorial-strapi-chakra-ui/)
-   [Invoice Genarator Example | Part I](/blog/refine-react-admin-invoice-genarator/) - [Invoice Genarator Example | Part II](/blog/refine-invoice-generator/)
-   [Windows95 UI Admin Panel](/blog/awesome-react-windows95-ui-with-refine/)
-   [Feedback Admin Panel](/blog/create-a-feedback-admin-panel-with-refine-and-strapi/)
-   [Job Posting Admin Panel](/blog/customizable-admin-panel-with-nestjs/)
-   [E-mail Subscription Example](/blog/e-mail-subscription-panel-with-refine/)

## How to use Refine

**refine** is very simple to use. Its examples and structure are handled in their simplest form. It is very successful in terms of documentation. You can find the answers you are looking for or a very detailed explanation of how to use a feature in the documentation.

Let's see how to use it!

### Create a Refine Project

Let's start by creating our **refine** project. You can use the superplate to create a refine project. superplate will quickly create our refine project according to the features we choose.

```bash
npm create refine-app@latest my-first-refine-project -- -p refine-react -b v3
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-04-29-create-full-stack-app/create.gif" alt="Create Refine App" />
</div>
<br />

Creating your project is that easy. All the packages you need and choose come ready-made.

Our project is ready. Now let's consider the process of fetching items from an API with 1000 items and listing only their titles.
First, we will use libraries such as axios, fetch to fetch the data. Then after the data comes, we will show it in the UI. If there is a change in the state, we will have to change them from the beginning and think about them. Even in its simplest form, it can be challenging to handle.

With **refine**, with just a few lines of code,
Besides basic operations (such as data fetching), you can manage and manipulate state changes in your user interface. You can also manage filtering, sorting and pagination of your data by adding just a few simple lines of code.

Let's see how we can use these processes and features that we talked about with **refine**.

We will use refine's `https://api.fake-rest.refine.dev/` API to fetch the titles we mentioned. Thanks to the project we set up with superplate, our `App.tsx` comes ready. Now let's create a list component with Refine and see how to fetch the titles.

```json
{
    "id": 1,
    "title": "Facilis voluptas sit consequatur commodi.",
    "slug": "enim-possimus-nostrum",
    "content": "Laborum consequatur illo illum sit. Dolorem et recusandae consequatur qui voluptas fuga mollitia voluptate. Et excepturi magnam. Et fugiat doloribus et. Ipsa aperiam et. Qui saepe repudiandae quam tempora. Eos necessitatibus voluptatem facilis maxime. Nobis et accusantium rerum libero tempore earum autem suscipit quas. Dolorem consequatur quam. Repellat praesentium veniam tempora excepturi iste veritatis quia sit.",
    "hit": 798263
}
```

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        />
    );
};

export default App;
```

<h3> Step I </h3>

```tsx title="src/pages/PostList.tsx"
//highlight-start
import { List, Table, useTable } from "@refinedev/antd";
//highlight-end

export const PostList: React.FC = () => {
    //highlight-next-line
    const { tableProps } = useTable<IPost>();
    return (
        //highlight-start
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="TITLE" />
            </Table>
        </List>
        //highlight-end
    );
};

interface IPost {
    title: string;
}
```

<h3> Step II </h3>

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import "@refinedev/antd/dist/reset.css";
//highlight-next-line
import { PostList } from "pages/post";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            //highlight-next-line
            resource={[{ name: "posts", list: PostList }]}
        />
    );
};

export default App;
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-04-29-create-full-stack-app/first.png" alt="Refine Posts Page" />
</div>
<br />

As you have seen, we have listed and paginated the titles coming from an API by writing just a few lines of code, thanks to the **refine** and `refine-antd` package. This is the simplest example of refinement. It is possible to do much more, and the Dashboard you need, B2B, B2C, Admin Panel and any web application you want with refine in a very short time and in a very flexible way.

## Refine Demo Apps

-   Refine Client Example -> [Refine Headless + Refine Core + Next.js (SSR) + Tailwind CSS](https://refine.dev/demo/)

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-04-29-create-full-stack-app/client_home.png" alt="Refine Client App" />
</div>
<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-04-29-create-full-stack-app/client_menu.png" alt="Refine Client App" />
</div>
<br />

-   Refine Admin Panel Example -> [Refine Antd + Refine Core ](https://example.admin.refine.dev/)

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-04-29-create-full-stack-app/dashboard.png" alt="Refine Dashboard" />
</div>
<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-04-29-create-full-stack-app/products.png" alt="Refine Admin Panel Producst Page" />
</div>
<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-04-29-create-full-stack-app/reviews.png" alt="Refine Reviews Page" />
</div>
<br />

## Powerful Features of Refine

-   Headless
-   Next.js/SSR Support 🚀🚀🚀
-   Realtime
-   Access Control (RBAC, LDAP, ACL, ABAC, etc.)
-   i18n (internationalization)
-   Audit Log(Comming Soon)
-   Material UI Support(Comming Soon)
-   CSV Import/Export
-   Multi Level Menu
-   GraphQL Support
-   Dynamic Multi-level Menus
-   All features of **refine** are available as **open source**.

[For more information about all **refine** features and **refine** →](/docs/)

[Comparison | Refine vs React-Admin vs AdminBro vs Retool →](/docs/comparison/)

## Conclusion

In this article, we went through **refine** and showed you how to create a full stack application with backend providers that are integrated with it. You may rapidly and flexibly create a web application with **refine**. **refine** is a very successful and developing open source `internal tool` framework. It solves the deficiencies in `B2B`, `B2`C and `Admin panel` development processes well and offers features suitable for needs.

One of the biggest features that distinguishes **refine** from other frameworks is that it is customizable. Combined with _refine_ `headless`, it now provides more customization options. This provides a great deal of convenience in the project you will develop.

You can develop any web application or admin panel you want in a very short time with **refine**.

Give **refine** a star on [GitHub](https://github.com/refinedev/refine) if you like it - your support will help us continue making this tool amazing!
