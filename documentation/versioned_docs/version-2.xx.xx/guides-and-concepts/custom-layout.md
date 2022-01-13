---
id: custom-layout
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

## Usage

Let's look at an example of modifying the default layout to have a top menu layout.

```tsx title="/src/App.tsx"
import { Refine, AntdLayout, Link } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";

// highlight-next-line
import { CustomSider } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
// highlight-start
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
// highlight-end
            Title={() => (
                <Link to="/" style={{ float: "left", marginRight: "10px" }}>
                    <img src="/refine.svg" alt="Refine" />
                </Link>
            )}
        />
    );
};

export default App;
```

Here, we override the [`<Title>`][title] and [`<Layout>`][layout] components. When we override [`<Layout>`][layout], we put the `<CustomSider>` (instead of the [`<Sider>`][sider] that was provided to [`<Layout>`][layout] to render it by default) on top of [`<AntdLayout>`][antdlayout].

So, we just provided a custom [`<Sider>`][sider]. Here's our custom sider that looks horizontal, instead of the default vertical one:

```tsx  title="/src/components/sider/index.tsx"
import { Link, Menu, useMenu, useTitle } from "@pankod/refine";

export const CustomSider: React.FC = () => {
// highlight-start
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();
// highlight-end

    return (
        <>
// highlight-start
            <Title collapsed={false} />
            <Menu selectedKeys={[selectedKey]} mode="horizontal">
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
// highlight-end
        </>
    );
};
```

Here, we use [`useMenu`][usemenu] hook to get the list of current resources and print it.

:::info
By default, [`<Sider>`][sider] is responsible for rendering [`<Title>`][title]. It gets this component (configured by [`<Refine>`][refine] and/or [`<LayoutWrapper>`][layoutwrapper]) by [`useTitle`][usetitle] hook.
:::

:::info
This example demonstrated how to configure a global layout. To learn how to use global layout in custom pages and make local modifications per page, [refer to the `<LayoutWrapper>` docs. &#8594][layoutwrapper]
:::

## Live Codesandbox Example

Here's how it looks in the end:

<iframe src="https://codesandbox.io/embed/refine-top-menu-layout-example-yb9r8?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-top-menu-layout-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[refine]: /api-references/components/refine-config.md
[layout]: /api-references/components/refine-config.md#layout
[sider]: /api-references/components/refine-config.md#sider
[footer]: /api-references/components/refine-config.md#footer
[header]: /api-references/components/refine-config.md#header
[offlayoutarea]: /api-references/components/refine-config.md#offlayoutarea
[title]: /api-references/components/refine-config.md#title
[layoutwrapper]: /api-references/components/layout-wrapper.md
[custom page example]: /guides-and-concepts/custom-pages.md
[custom page example code]: /examples/customization/topMenuLayout.md
[antdlayout]: https://ant.design/components/layout/
[usemenu]: /api-references/hooks/resource/useMenu.md
[usetitle]: /api-references/hooks/refine/useTitle.md
