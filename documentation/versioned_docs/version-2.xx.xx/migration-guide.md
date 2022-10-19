---
id: migration-guide
title: Migration Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

## 1.0.XX to 2.0.XX

### Motivation behind breaking changes

#### `resources`

Making `resources` property-based instead of component-based was necessary for Nextjs support. A property is also more flexible, dynamic and easier to configure compared to a component.

#### `routerProvider`

Router layer is abstracted from the core for mainly Nextjs support. This also creates the opportunity for any other router solution to be used.

#### Custom Pages

This is also related to abstracting away the router layer from core. Differences between (currently two) router provider are so big that adding a layer to cover both cases (possibly more in the future) is much harder to implement and maintain compared to letting everyone handle it with their own conventions. This also has the huge benefit of allowing maximum configurability for every respective provider.

## 🪄 Migrating your project automatically with refine-codemod ✨ (recommended)

[`@pankod/refine-codemod`][refine-codemod] package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `1.x.x` to `2.x.x`.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @pankod/refine-codemod refine1-to-refine2
```

And it's done. Now your project uses `refine@2.x.x`.

## Migrating your project manually

### Updating the packages

Packages used by your app must be updated to `^2.xx.xx`

export const Packages = () => {
    const packages = [
        "@pankod/refine",
        "@pankod/refine-airtable",
        "@pankod/refine-altogic",
        "@pankod/refine-graphql",
        "@pankod/refine-hasura",
        "@pankod/refine-nestjsx-crud",
        "@pankod/refine-nextjs-router",
        "@pankod/refine-react-router",
        "@pankod/refine-simple-rest",
        "@pankod/refine-strapi",
        "@pankod/refine-strapi-graphql",
        "@pankod/refine-supabase",
    ]
    return (
        <Tabs
        defaultValue="@pankod/refine"
        values={packages.map(p => ({
            label: p, value: p
        }))}
        >{
            packages.map(p => 
            <TabItem value={p}>
                <CodeBlock className="language-bash">{`npm i ${p}@latest`}</CodeBlock>
            </TabItem>
            )
        }
        </Tabs>
        )
}

<Packages/>

### `<Resource/>` to `resources`


`<Resource/>` is deprecated. Resources must be passed to [`resources`][resources] prop instead.

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
// highlight-start
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
// highlight-end
        />
    );
};

export default App;
```

### `routerProvider`

[`<Refine/>`][refine] now requires a [`routerProvider`][routerProvider]. You can use packages **@pankod/refine-react-router** or **@pankod/refine-nextjs-router** provided by **refine**.

<Tabs
defaultValue="react"
values={[
{label: 'React Router', value: 'react'},
{label: 'Next.js Router', value: 'nextjs'}
]}>
<TabItem value="react">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

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

### `Link` component

If you imported `Link` component from `@pankod/refine`, now you have to switch to `@pankod/refine-react-router` package to get the `Link` component. Like this:

```ts
// Old
// import { ..., Link } from "@pankod/refine";

// Now
import routerProvider from "@pankod/refine-react-router";

const Link = routerProvider.Link;
```

### Custom Pages

`routes` prop of `<Refine/>` is deprecated. Custom routes must be handled by the router provider you choose. [Refer to Custom Pages documentation for a detailed guide][customPages]

[refine-codemod]: https://github.com/refinedev/refine/tree/master/packages/codemod
[refine]: /api-references/components/refine-config.md
[resources]: /api-references/components/refine-config.md#resources
[routerProvider]: /api-references/providers/router-provider.md
[customPages]: /guides-and-concepts/custom-pages.md
