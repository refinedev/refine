---
id: layout-wrapper
title: <LayoutWrapper>
---

## Overview

`<LayoutWrapper>` wraps its contents in **refine's** layout with all customizations made in [`<Refine>`][refine] component. It is the default layout used in resource pages. It can be used in [custom pages][custom pages] to use global layout.

This component accepts layout customizations to further customize the layout parameters (`Title`, `Sider`, `Header`, `Footer`, `Layout`, `OffLayoutArea`) defined in [`<Refine>`][refine] component.

## Usage

`<LayoutWrapper>` can be used inside custom pages to use global layout with all its customizations.

An example use in a custom page may look like this:

```tsx title="App.tsx"
// highlight-next-line
import { Refine, Authenticated, LayoutWrapper } from "@pankod/refine-core";

import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

// highlight-start
const AuthenticatedPostReview = () => {
    return (
        <Authenticated>
            <LayoutWrapper Sider={() => <></>}>
                <PostReview />
            </LayoutWrapper>
        </Authenticated>
    );
};
// highlight-end

const App: React.FC = () => {
    return (
        <Refine
            // highlight-start
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        exact: true,
                        component: AuthenticatedPostReview,
                        path: "/authenticated-page",
                    },
                ] as typeof routerProvider.routes,
            }}
            // highlight-end
            dataProvider={dataProvider(API_URL)}
            resources={[{ name: "posts", list: PostList }]}
        />
    );
};

export default App;
```

In this example, we hide the left sider only for this page. The rest should look same as resource pages.

## API Reference

### Properties

| Property      | Description                                           | Type       | Default |
| ------------- | ----------------------------------------------------- | ---------- | ------- |
| Layout        | Outer component that renders other components         | `React.FC` | \*      |
| Sider         | [Custom sider to use][refine#sider]                   | `React.FC` | \*      |
| Header        | [Custom header to use][refine#header]                 | `React.FC` | \*      |
| Title         | [Custom title to use][refine#title]                   | `React.FC` | \*      |
| Footer        | [Custom footer to use][refine#footer]                 | `React.FC` | \*      |
| OffLayoutArea | [Custom off layout area to use][refine#offlayoutarea] | `React.FC` | \*      |

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine][refine]>** component.

[refine]: /core/components/refine-config.md
[custom pages]: guides-and-concepts/custom-pages.md
[refine#sider]: /core/components/refine-config.md#sider
[refine#header]: /core/components/refine-config.md#header
[refine#title]: /core/components/refine-config.md#title
[refine#footer]: /core/components/refine-config.md#footer
[refine#offlayoutarea]: /core/components/refine-config.md#offlayoutarea
