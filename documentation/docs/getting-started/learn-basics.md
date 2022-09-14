---
id: basics
title: Learn the Basics
---

This guide will help you learn and get information of basic **refine** concepts. To learn more about **refine** features, we recommend that you read the [`Overview`](https://refine.dev/docs/getting-started/overview/) and this guide before starting development.

## Getting Help

**refine** has a very friendly community, we are always happy to help you get started:

-   [Join the Discord Community](https://discord.gg/refine) – it is the easiest way to get help, all questions are usually answered in about 30 minutes.
-   [GitHub Discussions](https://github.com/pankod/refine/discussions) – ask anything about the project or give feedback.

## General Concepts

-   **refine** core is fully independent of UI. So you can use core components and hooks without any UI dependency.
-   All the **data** related hooks([`useTable`](/core/hooks/useTable.md), [`useForm`](/core/hooks/useForm.md), [`useList`](/core/hooks/data/useList.md) etc.) of **refine** can be given some common properties like `resource`, `metaData`, `queryOptions` etc.

### `resource`

**refine** passes the `resource` to the `dataProvider` as a params. This parameter is usually used to as a API endpoint path. It all depends on how to handle the `resource` in your `dataProvider`. See the [`creating a data provider`](/core/providers/data-provider.md#creating-a-data-provider) section for an example of how `resource` are handled.

How does refine know what the resource value is?

1- The resource value is determined from the active route where the component or the hook is used.

Like below, if you are using the hook in the `<PostList>` component, the `resource` value defaults to `"posts"`.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostList } from "pages/posts/list.tsx";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};

export default App;
```

2- The resource value is determined from the `resource` prop of the hook.

You can override the default `resource` value hook by passing the `resource` prop to the hook like below:

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";

const PostList: React.FC = () => {
    const result = useTable({
        //highlight-next-line
        resource: "users",
    });

    return <div>...</div>;
};
```

How can I request an API with nested route?

<br/>

[Refer to how to use resource with nested routes documentation for more information. &#8594](/faq.md#how-can-i-request-an-api-with-nested-route)

### `metaData`

`metaData` is used following two purposes:

-   To pass additional information to data provider methods.
-   Generate GraphQL queries using plain JavaScript Objects (JSON).

How to use `metaData` to pass additional information to data provider methods?

```tsx
useOne({
    resource: "posts",
    id: 1,
    // highlight-start
    metaData: {
        headers: { "x-meta-data": "true" },
    },
    // highlight-end
});

const myDataProvider = {
    ...
    getOne: async ({ resource, id, metaData }) => {
        // highlight-next-line
        const headers = metaData?.headers ?? {};
        const url = `${apiUrl}/${resource}/${id}`;

        //highlight-next-line
        const { data } = await httpClient.get(url, { headers });

        return {
            data,
        };
    },
    ...
};
```

In the above example, we pass the `headers` property in the `metaData` object to the `getOne` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

[Refer to the how to pass `metaData` to your existing `dataProvider` methods. &#8594](/faq.md#how-i-can-override-specific-function-of-data-providers)

[Refer to the `GraphQL` guide to learn how to use `metaData` to create GraphQL queries. &#8594](/guides-and-concepts/data-provider/graphql.md)

## Refine Packages

-   `@pankod/refine-core` - collection of 20+ React hooks for State, Networking, Authentication, Authorization, i18n and Live/Realtime Management.

**UI Framework Packages:**

-   `@pankod/refine-antd` - a fully featured [Ant Design](https://ant.design/) System UI Framework support. Includes +20 Table, Form, Select, Menu, Layout, Notification and CRUD components and hooks.
-   `@pankod/refine-mui` - a fully featured [Material UI](https://mui.com/) Framework support. Includes DataGrid (Pro included), AutoComplete, Menu, Layout, Notification and CRUD components and hooks.
-   `@pankod/refine-mantine` - (Coming soon!) - a fully featured [Mantine](https://mantine.dev/) support.

**[Data Provider](https://refine.dev/docs/core/providers/data-provider/) Packages:**

-   `@pankod/refine-simple-rest` - a fully featured REST API Data Provider
-   `@pankod/refine-graphql` - a fully featured GraphQL Data Provider
-   `@pankod/refine-nestjsx-crud` - a fully featured [NestJs Crud](https://github.com/nestjsx/crud) Data Provider
-   `@pankod/refine-strapi-v4` - a fully featured [Strapi-v4](https://strapi.io/) Data Provider
-   `@pankod/refine-strapi-graphql` - a fully featured [Strapi-GraphQL](https://strapi.io/) Data Provider
-   `@pankod/refine-strapi` - a fully featured [Strapi](https://strapi.io/) Data Provider
-   `@pankod/refine-supabase` - a fully featured [Supabase](https://supabase.com/) Data Provider. Also supported Supabase Realtime feature.
-   `@pankod/refine-hasura` - a fully featured [Hasura GraphQL](https://hasura.io/) Data Provider. Also supported GraphQL Subscriptions feature.
-   `@pankod/refine-appwrite` - a fully featured [Appwrite](https://appwrite.io/) Data Provider. Also supported Appwrite Realtime feature.
-   `@pankod/refine-medusa` - a fully featured [Medusa](https://medusajs.com/) Data Provider
-   `@pankod/refine-airtable` - a fully featured [Airtable](https://airtable.com/) Data Provider
-   `@pankod/refine-altogic` - a fully featured [Altogic](https://www.altogic.com/) Data Provider

**[Router Provider](https://refine.dev/docs/core/providers/router-provider/) Packages**

-   `@pankod/refine-react-router-v6` - Router Provider for [React Router (v6)](https://reactrouter.com)
-   `@pankod/refine-react-router` - Router Provider for [React Router (v5)](https://v5.reactrouter.com/)
-   `@pankod/refine-nextjs-router` - Router Provider for [Next.js](https://nextjs.org/docs/api-reference/next/router#userouter)
-   `@pankod/refine-react-location` - Router Provider for [React Location](https://github.com/tannerlinsley/react-location)
-   `@pankod/refine-remix-router` - Router Provider for [Remix](https://remix.run/)

**[Live Provider](https://refine.dev/docs/core/providers/live-provider/) Packages**

-   `@pankod/refine-ably` - [Ably](https://ably.com/) Live/Realtime Provider

**Other Packages**

-   `@pankod/refine-kbar` - [kbar](https://kbar.vercel.app/) integration for `command`/`crtrl`+`k` interface for your Refine App.

**❤️ Community Packages:**

-   [`refine-firebase`](https://github.com/rturan29/refine-firebase) - a fully featured [Firebase](https://firebase.google.com/) Data Provider by [rturan29](https://github.com/rturan29)
-   [`@tspvivek/refine-directus`](https://github.com/tspvivek/refine-directus) - a fully featured [Directus](https://directus.io/) Data Provider by [tspvivek](https://github.com/tspvivek)
-   [`data-provider-customizer`](https://github.com/miyavsu-limited/data-provider-customizer) - Customize your data provider by mixing it with different data providers/data methods by [miyavsu-limited](https://github.com/miyavsu-limited)

## Refine 3rd Party Integration Examples

**[i18n Provider](https://refine.dev/docs/core/providers/i18n-provider/)**

-   React - [i18next](https://react.i18next.com/) - [Example](https://refine.dev/docs/examples/i18n/i18n-react/) - [Source Code](https://github.com/pankod/refine/blob/master/examples/i18n/react/src/App.tsx#L17)
-   Next.js - [next-i18next](https://github.com/isaachinman/next-i18next) - [Example](https://refine.dev/docs/examples/i18n/i18n-nextjs/) - [Source Code](https://github.com/pankod/refine/blob/master/examples/i18n/nextjs/pages/_app.tsx#L20)

**[Access Control Provider](https://refine.dev/docs/api-references/providers/accessControl-provider/)**

-   [Casbin](https://casbin.org/) - [Example](https://refine.dev/docs/examples/access-control/casbin/) - [Source Code](https://github.com/pankod/refine/blob/master/examples/accessControl/casbin/src/App.tsx#L27)
-   [Cerbos](https://cerbos.dev/) - [Example](https://refine.dev/docs/examples/access-control/cerbos/) - [Source Code](https://github.com/pankod/refine/blob/master/examples/accessControl/cerbos/src/App.tsx#L37)


**[Auth Provider](https://refine.dev/docs/api-references/providers/auth-provider/)**

-   [Auth0](https://auth0.com/) - [Example](https://refine.dev/docs/examples/auth-provider/auth0/) - [Source Code](https://github.com/pankod/refine/blob/master/examples/authProvider/auth0/src/App.tsx#L23)
-   [Google Auth](https://developers.google.com/identity/protocols/oauth2) - [Example](https://refine.dev/docs/examples/auth-provider/google-auth/) - [Source Code](https://github.com/pankod/refine/blob/master/examples/authProvider/googleLogin/src/App.tsx#L23)

## Complete Application Examples

-   [RealWorld](https://github.com/gothinkster/realworld) - Exemplary fullstack [Medium.com](https://medium.com) Clone - [Live Example](http://refine.dev/docs/examples/real-world-refine-example/) - [Source Code](https://github.com/pankod/refine/tree/master/examples/real-world-example/src)
-   We are going back to 1995! - Win95 Style Admin Panel - [Blog Post](https://refine.dev/blog/awesome-react-windows95-ui-with-refine/) - [Live Example](https://win95.refine.dev) - [Source Code](https://github.com/pankod/refine/tree/master/examples/blog/win95)
-   Invoice Generator App with Strapi & Refine & Ant Design - [Blog Post](https://refine.dev/blog/refine-react-admin-invoice-genarator/) - [Live Example](https://stackblitz.com/github/pankod/refine/tree/master/examples/blog/invoiceGenerator/?preset=node) - [Source Code](https://github.com/pankod/refine/tree/master/examples/blog/invoiceGenerator/src)
-   Refeedback! - Feedback Admin Panel with Strapi & Refine & Ant Design - [Blog Post](https://refine.dev/blog/create-a-feedback-admin-panel-with-refine-and-strapi/) - [Source Code](https://github.com/pankod/refine/tree/master/examples/blog/refeedback)
-   E-mail Subscription Panel with Refine and Strapi & Ant Design - [Blog Post](https://refine.dev/blog/e-mail-subscription-panel-with-refine/) - [Source Code](https://github.com/pankod/refine/tree/master/examples/blog/mailSubscription)
-   Internal Issue Tracker With Refine and Supabase - [Blog Post](https://refine.dev/blog/customizable-issue-tracker-with-refine-and-supabase/) - [Live Example](https://stackblitz.com/github/pankod/refine/tree/master/examples/blog/issueTracker/?preset=node) - [Source Code](https://github.com/pankod/refine/tree/master/examples/blog/issueTracker)
-   Next.js E-commerce App with Strapi & Chakra UI & Refine - [Blog Post](https://refine.dev/blog/handcrafted-nextjs-e-commerce-app-tutorial-strapi-chakra-ui/) - [Live Example](https://stackblitz.com/github/pankod/refine/tree/master/examples/blog/ecommerce/?preset=node) - [Source Code](https://github.com/pankod/refine/tree/master/examples/blog/ecommerce)
-   Multi-tenancy Example - [Appwrite Guide](https://refine.dev/docs/guides-and-concepts/multi-tenancy/appwrite/) - [Strapi Guide](https://refine.dev/docs/guides-and-concepts/multi-tenancy/strapi-v4/)

## Become a Refine guest technical writer

We are looking for guest technical writers to publish posts about React and front-end ecosystem technologies.

The focus of these posts should be on React and front-end ecosystem technologies.

[If you are interested in writing for us, please check this post for detailed information &#8594](https://refine.dev/blog/refine-writer-program/)

Thanks for considering being a part of our blog!

## Roadmap

You can find Refine's [Public Roadmap here!](https://github.com/pankod/refine/projects/1)

## Next Steps

-   [Comparison | Refine vs React-Admin vs AdminBro vs Retool &#8594](/comparison.md)

-   [Create React App + Ant Design Tutorial &#8594](/ui-frameworks/antd/tutorial.md)

-   [Create React App + Material UI Tutorial &#8594](/ui-frameworks/mui/tutorial.md)

-   [Next.js + Tailwind Tutorial &#8594](/core/tutorial.md)

-   [Check the Guides & Concept section to learn generic solutions to common problems &#8594](/guides-and-concepts/upload/multipart-upload.md)

-   [Check example section for code snippets &#8594](/examples/tutorial/antd-tutorial.md)
