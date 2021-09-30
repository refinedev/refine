---
id: layout-wrapper
title: <LayoutWrapper>
---
## Overview

`<LayoutWrapper>` wraps its contents in **refine's** layout with all customizations made in [`<Refine>`][Refine] component. It is the default layout used in [`<Resource>`][Resource] pages. It can be used in [custom pages][Custom Pages] to use global layout.

This component accepts layout customizations to further customize the layout parameters (`Title`, `Sider`, `Header`, `Footer`, `Layout`, `OffLayoutArea`) defined in [`<Refine>`][Refine] component.

## Usage

`<LayoutWrapper>` can be used inside custom pages to use global layout with all its customizations.

An example use in a custom page may look like this:

```tsx title="App.tsx" {4, 14-22, 28-34}
import {
    Refine,
    Resource,
    Authenticated,
    LayoutWrapper,
} from "@pankod/refine";

import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const AuthenticatedPostReview = () => {
    return (
        <Authenticated>
            <LayoutWrapper Sider={() => <></>}>
                <PostReview />
            </LayoutWrapper>
        </Authenticated>
    );
};

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

In this example, we hide the left sider only for this page. The rest should look same as resource pages.

## API Reference

### Properties

| Property      | Description                                           | Type       | Default |
| ------------- | ----------------------------------------------------- | ---------- | ------- |
| dashboard     |                                                       | `boolean`  | *       |
| Layout        | Outer component that renders other components         | `React.FC` | *       |
| Sider         | [Custom sider to use][Refine#Sider]                   | `React.FC` | *       |
| Header        | [Custom header to use][Refine#Header]                 | `React.FC` | *       |
| Title         | [Custom title to use][Refine#Title]                   | `React.FC` | *       |
| Footer        | [Custom footer to use][Refine#Footer]                 | `React.FC` | *       |
| OffLayoutArea | [Custom off layout area to use][Refine#OffLayoutArea] | `React.FC` | *       |

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine][Refine]>** component.

[Refine]: api-references/components/refine-config.md
[Resource]: api-references/components/resource.md
[Custom Pages]: guides-and-concepts/custom-pages.md
[Refine#Sider]: api-references/components/refine-config.md#sider
[Refine#Header]: api-references/components/refine-config.md#header
[Refine#Title]: api-references/components/refine-config.md#title
[Refine#Footer]: api-references/components/refine-config.md#footer
[Refine#OffLayoutArea]: api-references/components/refine-config.md#offlayoutarea
