---
id: overview
title: Overview
---

import architectureDiagram from '@site/static/img/getting-started/refine_architecture.png';

import benchmarkChart from '@site/static/img/getting-started/benchmark.png';

## What is refine?

**refine** is a [React](https://reactjs.org/)-based framework for building data-intensive applications in no time :sparkles: It ships with [Ant Design System](https://ant.design/), an enterprise-level UI toolkit.

Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to _admin panels_, _B2B applications_ and _dashboards_.

###

## Key features

⚙️ **Zero-configuration**: One-line setup with [superplate](https://github.com/pankod/superplate). It takes less than a minute to start a project.

📦 **Out-of-the-box** : Routing, networking, authentication, state management, i18n and UI.

🔌 **Backend Agnostic** : Connects to any custom backend. Built-in support for [REST API](https://github.com/pankod/refine/tree/master/packages/simple-rest), [GraphQL](https://github.com/pankod/refine/tree/master/packages/graphql), [NestJs CRUD](https://github.com/pankod/refine/tree/master/packages/nestjsx-crud), [Airtable](https://github.com/pankod/refine/tree/master/packages/airtable), [Strapi](https://github.com/pankod/refine/tree/master/packages/strapi), [Strapi v4](https://github.com/pankod/refine/tree/master/packages/strapi-v4), [Strapi GraphQL](https://github.com/pankod/refine/tree/master/packages/strapi-graphql), [Supabase](https://github.com/pankod/refine/tree/master/packages/supabase), [Hasura](https://github.com/pankod/refine/tree/master/packages/hasura), [Appwrite](https://github.com/pankod/refine/tree/master/packages/appwrite) and [Altogic](https://github.com/pankod/refine/tree/master/packages/altogic).

📝 **Native Typescript Core** : You can always opt out for plain JavaScript.

🔘 **Decoupled UI** : UI components are exposed directly without encapsulation. You have full control on UI elements.

🐜 **Powerful Default UI** : Works seamlessly with integrated [Ant Design System](https://ant.design/). (Support for multiple UI frameworks is on the Roadmap)

📝 **Boilerplate-free Code** : Keeps your codebase clean and readable.

### Motivation

Higher-level frontend frameworks can save you a lot time, but they typically offer you a trade-off between speed and flexibility.

After many years of experience in developing B2B frontend applications and working with popular frameworks, we came up with a new approach to tackle this dilemma. This is how **refine** is born.

**Refine** is a collection of helper `hooks`, `components` and `providers`. They are all decoupled from your UI components and business logic, so they never keep you from customizing your UI or coding your own flow.

As **refine** is totally _unopinionated_ about UI and logic, it's strongly _opinionated_ about three parts of your application:

1. **API Networking**
2. **State Management**
3. **Authentication & Authorization**

We believe, these are the most important components of a data-intensive frontend application and should be handled in a robust way by leveraging industry best practices.

**refine** guarantees you a perfect implementation of these building blocks in your project, so you can focus on your development.

### Architecture

**refine** makes extensive use of [hooks](https://reactjs.org/docs/hooks-reference.html#gatsby-focus-wrapper) as a default way for interacting with your components.
Under the hood, **refine** relies heavily to [React Query](https://react-query.tanstack.com/) for data handling, caching and state management.
Access to external sources and API's happen via providers which are basically plug-in type components for extendibility.

<div style={{textAlign: "center"}}>
    <img src={architectureDiagram} width="400px" />
</div>

### Benchmark

After releasing the first internal versions, we had the chance to migrate some of our _React_ projects to **refine**.
In addition to **shorter development** times and **overall performance gains**, we've measured significant reduction in project size.

**refine** makes your codebase significantly smaller, by eliminating redundant code such as _reducers_, _actions_ and _unit tests_. Below is a size comparison for an example project:

<div style={{textAlign: "center"}}>
    <img src={benchmarkChart} width="400px" />
</div>

### Quick Start

Run the **superplate** tool with the following command:

```
npx superplate-cli tutorial
```

Follow the _CLI wizard_ to select options and start creating your project.

After setup is complete, navigate to the project folder and start your project with:

```
npm run dev
```

Your **refine** application will be accessible at [http://localhost:3000](http://localhost:3000).

Replace the contents of `App.tsx` with the following code:

```tsx title="App.tsx"
import {
    Refine,
    useTable,
    List,
    Table,
    useMany,
    DateField,
} from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

import "@pankod/refine/dist/styles.min.css";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts", list: PostList }]}
        />
    );
};

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];

    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    return (
        <List>
            <Table<IPost> {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value: string) => {
                        if (isLoading) {
                            return "loading...";
                        }

                        return data?.data.find(
                            (item: ICategory) => item.id === value,
                        )?.title;
                    }}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
            </Table>
        </List>
    );
};

export default App;
```

```tsx title="interfaces.d.ts"
interface IPost {
    title: string;
    createdAt: string;
    category: ICategory;
}

interface ICategory {
    id: string;
    title: string;
}
```

### Roadmap

You can find Refine's [Public Roadmap here!](https://github.com/pankod/refine/projects/1)

## Special Thanks

[React Admin](https://marmelab.com/react-admin/) has been a great source of ideas and inspiration for refine. Big thanks to friends at [Marmelab](https://marmelab.com) for the amazing work they are doing.
