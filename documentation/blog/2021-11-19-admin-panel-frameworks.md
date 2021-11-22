---
title: Best Admin Panel Framework 2021
description: We will make a web application that allows you to quickly create subscribers and send emails to your subscribers in a simple way. We’ll use refine to develop the frontend easily and strapi for backend solutions.
slug: best-admin-panel-framework-2021
authors: melih
tags: [refine, strapi, react, tutorial]
image: https://refine.dev/img/refine_social.png
hide_table_of_contents: false
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import admin_flow from '@site/static/img/blog/2021-11-19-admin-panel-frameworks/admin_flow.png';
import refine_flow from '@site/static/img/blog/2021-11-19-admin-panel-frameworks/refine_flow.png';
import project_setup from '@site/static/img/blog/2021-11-19-admin-panel-frameworks/project_setup.gif';

Looking for open source Reactjs admin framework? Then here is the collection of the best Open-source Reactjs admin framework of 2021. 

<!--truncate-->

If you are reading this, chances are you are a developer researching options for delivering an admin panel or another internal tool. Together with you, we will take a look at the best admin panel frameworks in response to this need.

## React-Admin

React-Admin is an  B2B application framework based on Material Design, using Material UI. It provides ready-to-fetch-data components, so you just compose them together to create an application.

It can fetch data from any API connected to the data source, like REST, GraphQL, RPC. It’s powered by React, React Router, Redux, and Redux Saga, while Material UI is responsible for the visual.

React-admin uses Redux and redux-saga for state management. React-Admin creates actions and reducers automatically. Developer should only create data provider, which is used for running requests to the server side and parse server responses. But in some cases it is necessary to run non-typical request to the server side, or to change custom Store parameters. In this case React-Admin gives possibility to create custom actions, reducers and sagas.

React-admin is a framework that has been developed for a long time and has a wider community. Besides being stable, it works with old technologies.

### Installation
* Can be included in another React app 
* Installation is very simple

```bash
npm install react-admin
#or
yarn add react-admin
```

### Features
* It can be used with any backend(Rest, QraphQL, SOAP)
* API-based. The UI fetches the data from an API connected to the data source.
* Powered by Material UI, Redux, Redux Saga, React-router.
* Supports any authentication provider of your choice(REST API, OAuth, Basic Auth)
* Internationalization : Uses i18n
* Supports data validation

### SSR - Next.js Support 
React-Admin does not support SSR-Next.js. Therefore, it only helps you develop B2B and admin panel applications.

### Routing
React admin does it with react-router-dom to save routes. You need to create your own module and define it in the `<Route>` component.

```tsx title="src/customRoutes.js"
import * as React from "react";
import { Route } from 'react-router-dom';
import Foo from './Foo';
import Bar from './Bar';

export default [
    <Route exact path="/foo" component={Foo} />,
    <Route exact path="/bar" component={Bar} />,
];
```

Then, pass this array as customRoutes prop in the `<Admin>` component:

```tsx title="src/App.js"
import * as React from "react";
import { Admin } from 'react-admin';

import customRoutes from './customRoutes';

const App = () => (
    <Admin customRoutes={customRoutes} dataProvider={simpleRestProvider('http://path.to.my.api')}>
        ...
    </Admin>
);

export default App;
```

Now, when a user browses to /foo or /bar, the components you defined will appear in the main part of the screen.


### Data Provider Logic
When React-admin needs to communicate with API, it uses Data Provider.

<img src={admin_flow} alt="admin" />

Here are the React-Admin data provider methods:
```
const dataProvider = {
    getList:    (resource, params) => Promise,
    getOne:     (resource, params) => Promise,
    getMany:    (resource, params) => Promise,
    getManyReference: (resource, params) => Promise,
    create:     (resource, params) => Promise,
    update:     (resource, params) => Promise,
    updateMany: (resource, params) => Promise,
    delete:     (resource, params) => Promise,
    deleteMany: (resource, params) => Promise,
}
```
#### QraphQL Data Provider

### React-Admin Avaible Providers
The providers that React admin supports are as follows:
* Simple Rest: [https://github.com/marmelab/react-admin/tree/master/packages/ra-data-simple-rest](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-simple-rest)
* Json Server: [https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server)
* Simple GrapgQL: [https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple)
* Local JSON: [https://github.com/marmelab/react-admin/tree/master/packages/ra-data-localstorage](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-localstorage)
* Local Strage: [https://github.com/marmelab/react-admin/tree/master/packages/ra-data-localstorage](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-localstorage)
* Supabase: [https://github.com/marmelab/ra-supabase](https://github.com/marmelab/ra-supabase)


React-Admin Docs & Demo : [Documentation](https://marmelab.com/react-admin/Readme.html) - [Live Demo](https://marmelab.com/react-admin-demo/#/)


## Refine
Refine is a React-based framework that helps you to develop admin panel, B2B and dashboard that can be fully customized with Ant Design.

Refine directly provides Ant Design components and some hooks to work with those components. These hooks give you the required props for those Ant Design components.

Refine is a collection of helper hooks, components and providers. They are all decoupled from your UI components and business logic, so they never keep you from customizing your UI or coding your own flow.

Refine uses React Query for data processing, caching, and state management. In this respect, you do not need to define anything extra for every cases and model.

Although Refine is a newer framework, it is successful in identifying deficiencies in development and producing solutions accordingly. Using new technologies, it offers users more effective and simpler development options.

### Installation
* Installation is very simple and customizable options can be added.

```bash
npx superplate-cli demo-refine-project
```

<img src={project_setup} alt="setup" />

### Features

* Configuration: One-line setup with superplate. Project setup is very simple. Using superplate you can choose the content of your project and the features you want to add. 

* UI: You have full control over the UI elements. Fully customizable, open to use. Works seamlessly with integrated Ant Design System.

* Out-of-the-box: Routing, networking, authentication, state managment, i18n and UI.

* Next.js / SSR integration: refine can be used with Next.js to SSR your pages.

* React Location: React Location router provider support 

### SSR - Next.js Support 
Refine has support for SSR - Next.js. This is an important feature that distinguishes Refine from other frameworks. Thanks to this feature, Refine provides the opportunity to develop B2C applications in addition to B2B and admin panel.

Refine can be used with Next.js to SSR your pages. It doesn't get in the way and follows Next.js conventions and also provides helper modules when necessary.

#### SSR-Next.js Setup

```bash
npm i @pankod/refine @pankod/refine-nextjs-router
```

#### SSR-Next.js Basic Usage
`<Refine>` must wrap your pages in a custom App component. This way your pages are integrated to refine.

```tsx title=pages/_app.tsx
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
```
[For more information on how to add SSR-Next.js to your Refine project ->](https://refine.dev/docs/guides-and-concepts/ssr-nextjs/) 

### Routing
Refine uses a customized Router Provider to save routes and navigate between pages. Refine offers a much more flexible structure thanks to its routerProvider support.

A router provider must include the following methods:

```tsx
const routerProvider = {
    useHistory: () => {
        push: (...args) => any,
        replace: (...args) => any,
        goBack: (...args) => any,
    },
    useLocation: () => {
        pathname: string,
        search: string,
    },
    useParams: <Params extends { [K in keyof Params]?: string } = {}>() => Params,
    Prompt: React.FC<PromptProps*>,
    Link: React.FC<any>,
    RouterComponent?: React.FC<any>,
};
```

:::info
Refine includes many  router providers to use in your projects like: 

* React Router
* React Location
* Next.js Router
:::

[To take a look at how other router providers are defined and working](https://refine.dev/docs/api-references/providers/router-provider/)

To activate router provider in refine, we have to pass the routerProvider to the `<Refine />` component.

<Tabs
defaultValue="react-router"
values={[
{label: 'React Router', value: 'react-router'},
{label: 'React Location', value: 'react-location'},
{label: 'Next.js Router', value: 'nextjs'}
]}>
<TabItem value="react-router">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

const App: React.FC = () => {
    return <Refine routerProvider={routerProvider} />;
};
```

</TabItem>
<TabItem value="react-location">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-location";

const App: React.FC = () => {
    return <Refine routerProvider={routerProvider} />;
};
```

</TabItem>
<TabItem value="nextjs">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-nextjs-router";

const App: React.FC = () => {
    return <Refine routerProvider={routerProvider} />;
};
```

  </TabItem>
</Tabs>

You just need to tell the route of your component to the routerProvider.


### Data Provider Logic

A data provider is the place where a refine app communicates with an API.

<img src={refine_flow} alt="refine" />


A data provider must include following methods:

```
const dataProvider = {
    create: ({ resource, variables, metaData }) => Promise,
    createMany: ({ resource, variables, metaData }) => Promise,
    deleteOne: ({ resource, id, metaData }) => Promise,
    deleteMany: ({ resource, ids, metaData }) => Promise,
    getList: ({ resource, pagination, sort, filters, metaData }) => Promise,
    getMany: ({ resource, ids, metaData }) => Promise,
    getOne: ({ resource, id, metaData }) => Promise,
    update: ({ resource, id, variables, metaData }) => Promise,
    updateMany: ({ resource, ids, variables, metaData }) => Promise,
    custom: ({
        url,
        method,
        sort,
        filters,
        payload,
        query,
        headers,
        metaData,
    }) => Promise,
    getApiUrl: () => "",
};
```


:::note
Data hooks uses React Query to manage data fetching. React Query handles important concerns like caching, invalidation, loading states etc..
:::

#### QraphQL Data Provider


### Refine Avaible Providers
Connects to any REST or GraphQL custom backend.

* NestJs CRUD: [https://github.com/pankod/refine/tree/master/examples/dataProvider/nestjsxCrud](https://github.com/pankod/refine/tree/master/examples/dataProvider/nestjsxCrud)
* Airtable: [https://github.com/pankod/refine/tree/master/examples/dataProvider/airtable](https://github.com/pankod/refine/tree/master/examples/dataProvider/airtable)
* Strapi: [https://github.com/pankod/refine/tree/master/examples/dataProvider/strapi](https://github.com/pankod/refine/tree/master/examples/dataProvider/strapi)
* Strapi GraphQL: [https://github.com/pankod/refine/tree/master/examples/dataProvider/strapi-graphql](https://github.com/pankod/refine/tree/master/examples/dataProvider/strapi-graphql)
* Supabase: [https://github.com/pankod/refine/tree/master/examples/dataProvider/supabase](https://github.com/pankod/refine/tree/master/examples/dataProvider/supabase)
* Hasura: [https://github.com/pankod/refine/tree/master/examples/dataProvider/supabase](https://github.com/pankod/refine/tree/master/examples/dataProvider/supabase)
* Altogic: [https://github.com/pankod/refine/tree/master/examples/dataProvider/altogic](https://github.com/pankod/refine/tree/master/examples/dataProvider/altogic)

Refine Docs & Demo: [Documentation](https://refine.dev/docs/) - [Live Demo](https://refine.dev/demo/)