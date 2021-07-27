---
id: layout-wrapper
title: <LayoutWrapper>
---
## Overview

`<LayoutWrapper>` wraps its contents in **refine's** layout with all customizations made in [`<Refine>`][Refine] component. It is the default layout used in [`<Resource>`][Resource] pages. It can be used in [custom pages][Custom Pages] to use global layout.

This component accepts layout customizations to further customize the layout parameters (`Title`, `Sider`, `Header`, `Footer`, `Layout`, `OffLayoutArea`) defined in [`<Refine>`][Refine] component.

## Usage

Can be used inside custom pages to use global layout with all its customizations.

An example use in a custom page may look like this:

```tsx title="App.tsx"
import {
    Refine,
    Resource,
    Authenticated,
    //highlight-next-line
    LayoutWrapper,
} from "@pankod/refine";

import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

//highlight-start
const AuthenticatedPostReview = () => {
    return (
        <Authenticated>
            <LayoutWrapper>
                <PostReview />
            </LayoutWrapper>
        </Authenticated>
    );
};
//highlight-end

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-start
            routes={[
                {
                    exact: true,
                    component: AuthenticatedPostReview,
                    path: "/authenticated-page",
                },
            ]}
            //highlight-end
        >
            <Resource name="posts" list={PostList} />
        </Refine>
    );
};

export default App;
```

## API Reference

### Properties

| Property      | Description                                   | Type                                             | Default                                   |
| ------------- | --------------------------------------------- | ------------------------------------------------ | ----------------------------------------- |
| dashboard     |                                               | `boolean`                                        |                                           |
| Layout        | Outer component that renders other components | `string`                                         |                                           |
| Sider         | [Custom sider to use][Refine#Sider]           | ` "pessimistic` \| `"optimistic` \| `"undoable"` | `"pessimistic"`\*                         |
| Header        |                                               | `string`                                         | Resource name that it reads from the url. |
| Title         |                                               | `string`                                         | Resource name that it reads from the url. |
| Footer        |                                               | `string`                                         | Resource name that it reads from the url. |
| OffLayoutArea |                                               | `string`                                         | Resource name that it reads from the url. |

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine][Refine]>** component.

[Refine]: api-references/components/refine-config.md
[Resource]: api-references/components/resource.md
[Custom Pages]: guides-and-concepts/custom-pages.md
[Refine#Sider]: api-references/components/refine-config.md#sider
