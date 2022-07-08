---
id: mui-custom-layout
title: Custom Layout
---

You can create custom layouts using [`<Refine>`][refine] and [`<LayoutWrapper>`][layoutwrapper] components.

Both of these components can accept the listed props for customization. [`<Refine>`][refine] being for global customization and the [`<LayoutWrapper>`][layoutwrapper] being for local.

-   [`Layout`][layout]
-   [`Sider`][sider]
-   [`Footer`][footer]
-   [`Header`][header]
-   [`OffLayoutArea`][offlayoutarea]
-   [`Title`][title]

## Creating a Custom Layout

Let's start with creating a `<CustomLayout/>` component using `LayoutProps` from `@pankod/refine-core` with the following code:

```tsx title="src/components/layout.tsx"
import React from "react";
import { LayoutProps } from "@pankod/refine-core";
// highlight-next-line
import { Sider as DefaultSider, Box } from "@pankod/refine-mui";

export const CustomLayout: React.FC<LayoutProps> = ({
    Sider,
    Header,
    Footer,
    OffLayoutArea,
    children,
}) => {
    const SiderToRender = Sider ?? DefaultSider;

    return (
        <Box display="flex" flexDirection="row">
            <SiderToRender />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: "100vh",
                }}
            >
                {Header && <Header />}
                <Box
                    component="main"
                    sx={{
                        p: { xs: 1, md: 2, lg: 3 },
                        flexGrow: 1,
                        bgcolor: "background.default",
                    }}
                >
                    {children}
                </Box>
                {Footer && <Footer />}
            </Box>
            {OffLayoutArea && <OffLayoutArea />}
        </Box>
    );
};
```

We can now pass `CustomLayout` as `Layout` prop to `<Refine/>`:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import { ReadyPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList } from "pages/posts";
// highlight-next-line
import { CustomLayout } from "components";

const { Link } = routerProvider;

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            // highlight-start
            Layout={CustomLayout}
            // highlight-end
            ReadyPage={ReadyPage}
            // ...
        />
    );
};

export default App;
```

After this, `<Refine/>` will use the `CustomLayout` instead of it's default `Layout` component.

:::info
This example demonstrated how to configure a global layout. To learn how to use global layout in custom pages and make local modifications per page, [refer to the `<LayoutWrapper>` docs. &#8594][layoutwrapper]
:::

[refine]: /core/components/refine-config.md
[layout]: /core/components/refine-config.md#layout
[sider]: /core/components/refine-config.md#sider
[footer]: /core/components/refine-config.md#footer
[header]: /core/components/refine-config.md#header
[offlayoutarea]: /core/components/refine-config.md#offlayoutarea
[title]: /core/components/refine-config.md#title
[layoutwrapper]: /core/components/layout-wrapper.md
[custom page example]: /guides-and-concepts/custom-pages.md
[custom page example code]: /examples/customization/topMenuLayout.md
[antdlayout]: https://ant.design/components/layout/
[usemenu]: /core/hooks/ui/useMenu.md
[usetitle]: /core/hooks/refine/useTitle.md
