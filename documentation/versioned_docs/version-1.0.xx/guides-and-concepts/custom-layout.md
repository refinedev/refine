---
id: custom-layout
title: Custom Layout
---

You can create custom layouts using [`<Refine>`][Refine] and [`<LayoutWrapper>`][LayoutWrapper] components.

Both of these components can accept the listed props for customization. [`<Refine>`][Refine] being for global customization and the [`<LayoutWrapper>`][LayoutWrapper] being for local.

* [`Layout`][Layout]
* [`Sider`][Sider]
* [`Footer`][Footer]
* [`Header`][Header]
* [`OffLayoutArea`][OffLayoutArea]
* [`Title`][Title]

## Usage

Let's look at an example of modifying the default layout to have a top menu layout.

```tsx title="/src/App.tsx" {6, 14-34}
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
        >
            <Resource name="posts" list={PostList} />
        </Refine>
    );
};

export default App;
```

Here, we override the [`<Title>`][Title] and [`<Layout>`][Layout] components. When we override [`<Layout>`][Layout], we put the `<CustomSider>` (insted of the [`<Sider>`][Sider] that was provided to [`<Layout>`][Layout] to render it by default) on top of [`<AntdLayout>`][AntdLayout].

So, we just provided a custom [`<Sider>`][Sider]. Here's our custom sider that looks horizontal, instead of the default vertical one:

```tsx twoslash title="/src/components/sider/index.tsx" {3-4, 8, 10-14}
import { Link, Menu, useMenu, useTitle } from "@pankod/refine";

export const CustomSider: React.FC = () => {
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();

    return (
        <>
            <Title collapsed={false} />
            <Menu selectedKeys={[selectedKey]} mode="horizontal">
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </>
    );
};
```

Here, we use [`useMenu`][useMenu] hook to get the list of current resources and print it.

:::info
By default, [`<Sider>`][Sider] is responsible for rendering [`<Title>`][Title]. It gets this component (configured by [`<Refine>`][Refine] and/or [`<LayoutWrapper>`][LayoutWrapper]) by [`useTitle`][useTitle] hook.
:::

:::info
This example demonstrated how to configure a global layout. To learn how to use global layout in custom pages and make local modifications per page, [refer to the `<LayoutWrapper>` docs. &#8594][LayoutWrapper]
:::

## Live Codesandbox Example

Here's how it looks in the end:

<iframe src="https://codesandbox.io/embed/refine-top-menu-layout-example-n1v8x?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-top-menu-layout-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[Refine]: /api-references/components/refine-config.md
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
[useMenu]: /api-references/hooks/resource/useMenu.md
[useTitle]: /api-references/hooks/refine/useTitle.md
