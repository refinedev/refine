---
id: custom-layout
title: Custom Layout
---

You can create custom layouts using [`<Refine>`][Refine] and [`<LayoutWrapper>`][LayoutWrapper] components.

Both of these components accept these props to let you customize the layout globally (by using [`<Refine>`][Refine]) or locally (by using [`<LayoutWrapper>`][LayoutWrapper]) components:

* [`Layout`][Layout]
* [`Sider`][Sider]
* [`Footer`][Footer]
* [`Header`][Header]
* [`OffLayoutArea`][OffLayoutArea]
* [`Title`][Title]

:::info
For an example of local layout customization on a custom page, refer to [`Custom Page Example`][Custom Page Example].
:::

## Usage

Let's look at an example of modifying the default layout to have a top menu layout.

To see the end code and play with it, you can refer to [example code][Custom Page Example Code].

```tsx title="/src/App.tsx"
import { Refine, Resource, AntdLayout, Link } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";
import { CustomSider } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-start
            Layout={({ children, Footer, OffLayoutArea }) => (
                <AntdLayout>
                    <AntdLayout.Header>
                        <CustomSider />
                    </AntdLayout.Header>
                    <AntdLayout.Content>
                        <AntdLayout.Content>
                            <div style={{ padding: 24, minHeight: 360 }}>
                                {children}
                            </div>
                        </AntdLayout.Content>
                        <Footer />
                    </AntdLayout.Content>
                    <OffLayoutArea />
                </AntdLayout>
            )}
            Title={() => (
                <Link to="/" style={{ float: "left", marginRight: "10px" }}>
                    <img src="/refine.svg" alt="Refine" />
                </Link>
            )}
            //highlight-end
        >
            <Resource name="posts" list={PostList} />
        </Refine>
    );
};

export default App;
```

Here, we override the [`<Title>`][Title] and [`<Layout>`][Layout] components. When we override [`<Layout>`][Layout], we put the [`<Sider>`][Sider] (that was provided to [`<Layout>`][Layout] to render it) on top of [`<AntdLayout>`][AntdLayout].

[Refine]: /api-references/components/refine-config.mds
[Layout]: /api-references/components/refine-config.md#layout
[Sider]: /api-references/components/refine-config.md#sider
[Footer]: /api-references/components/refine-config.md#footer
[Header]: /api-references/components/refine-config.md#header
[OffLayoutArea]: /api-references/components/refine-config.md#offlayoutarea
[Title]: /api-references/components/refine-config.md#title
[LayoutWrapper]: /api-references/components/layout-wrapper.md
[Custom Page Example]: /guides-and-concepts/custom-pages.md
[Custom Page Example Code]: /examples/customization/topMenuLayout.md
[AntdLayout]: https://ant.design/components/layout/
