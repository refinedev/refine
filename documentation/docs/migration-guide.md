---
id: migration-guide
title: Migration Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## `<Resource/>` to `resources`

`<Resource/>` is deprecated. Resources must be passed to [`resources`][resources] prop instead.

```tsx title="App.tsx" {12-20}
import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
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

## `routerProvider`

[`<Refine/>`][refine] now requires a [`routerProvider`][routerProvider]. You can use packages **@pankod/refine-react-router** or **@pankod/refine-nextjs-router** provided by **refine**.

<Tabs
defaultValue="react"
values={[
{label: 'react-router', value: 'react'},
{label: 'nextjs-router', value: 'nextjs'}
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

## Custom Pages

`routes` prop of `<Refine/>` is deprecated. Custom routes must be handled by the router provider you choose. [Refer to Custom Pages documentation for a detailed guide][customPages]

## Motivation behind breaking changes

### `resources`

Making `resources` property-based instead of component-based was necessary for Nextjs support. A property is also more flexible, dynamic and easier to configure compared to a component.

### `routerProvider`

Router layer is abstracted from the core for mainly Nextjs support. This also creates the opportunity for any other router solution to be used.

### Custom Pages

This is also related to abstracting away the router layer from core. Differences between (currently two) router provider are so big that adding a layer to cover both cases (possibly more in the future) is much harder to implement and maintain compared to letting everyone handle it with their own conventions. This also has the huge benefit of allowing maximum configurability for every respective provider.


[refine]: /api-references/components/refine-config.md
[resources]: /api-references/components/refine-config.md#resources
[routerProvider]: /api-references/providers/router-provider.md
[customPages]: /guides-and-concepts/custom-pages.md

