---
id: mui-custom-layout
title: Layout
swizzle: true
---

You can create custom layouts using [`<Refine>`][refine] and [`<LayoutWrapper>`][layoutwrapper] components.

Both of these components can accept the listed props for customization. [`<Refine>`][refine] being for global customization and the [`<LayoutWrapper>`][layoutwrapper] being for local.

-   [`Layout`][layout]
-   [`Sider`][sider]
-   [`Footer`][footer]
-   [`Header`][header]
-   [`OffLayoutArea`][offlayoutarea]
-   [`Title`][title]

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Creating a Custom Layout

Let's start with creating a `<CustomLayout/>` component using `LayoutProps` from `@pankod/refine-core` with the following code:

```tsx title="src/components/layout.tsx"
import React from "react";
import { LayoutProps } from "@pankod/refine-core";
// highlight-next-line
import { Sider as DefaultSider, Header as DefaultHeader, Box } from "@pankod/refine-mui";

export const CustomLayout: React.FC<LayoutProps> = ({
    Sider,
    Header,
    Footer,
    OffLayoutArea,
    children,
}) => {
    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

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
                <HeaderToRender />
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

[refine]: /api-reference/core/components/refine-config.md
[layout]: /api-reference/core/components/refine-config.md#layout
[sider]: /api-reference/core/components/refine-config.md#sider
[footer]: /api-reference/core/components/refine-config.md#footer
[header]: /api-reference/core/components/refine-config.md#header
[offlayoutarea]: /api-reference/core/components/refine-config.md#offlayoutarea
[title]: /api-reference/core/components/refine-config.md#title
[layoutwrapper]: /api-reference/core/components/layout-wrapper.md
[custom page example]: /advanced-tutorials/custom-pages.md
[custom page example code]: /examples/customization/topMenuLayout.md
[antdlayout]: https://ant.design/components/layout/
[usemenu]: /api-reference/core/hooks/ui/useMenu.md
[usetitle]: /api-reference/core/hooks/refine/useTitle.md
