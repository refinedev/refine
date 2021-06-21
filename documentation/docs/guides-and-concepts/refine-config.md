---
id: refine-config
title: <Refine> Component
sidebar_label: <Refine>
---

`<Refine>` component is the entry point of a **refine** app. It is where the most high level configuration of the app occurs.
It requires only a [`dataProvider`](/docs/guides-and-concepts/providers/data-provider) to bootstrap the app. After adding a dataProvider `<Resource>`'s can be added as children.

```tsx title="App.tsx"
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider(API_URL)}>
            <Resource
                name="posts"
                list={PostList}
            />
        </Refine>
    );
};

export default App;
```