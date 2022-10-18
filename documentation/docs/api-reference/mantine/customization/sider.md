---
id: sider
title: Sider
---

There are 2 ways that will allow you to customize your `<Sider />` component if you need it.

You can access the `logout`, `dashboard`, `items` elements and `collapsed` state that we use in our default `Sider` component by using `render` properties. Customize it to your needs or you can create a custom `<Sider />` component and use it either by passing it to [`<Refine />`][refine] or using a [Custom Layout][customlayout].

## Customize Sider by Using `render` property

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);
import { List, Text, Code } from "@pankod/refine-mantine";

const DummyListPage = () => {
    const params = RefineCore.useRouterContext().useParams();

    return (
        <List>
            <Text italic color="dimmed" size="sm">
                URL Parameters:
            </Text>
            <Code>{JSON.stringify(params)}</Code>
        </List>
    );
};

const IconMoodSmile = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-mood-smile"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        stroke-width={2}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx={12} cy={12} r={9}></circle>
        <line x1={9} y1={10} x2="9.01" y2={10}></line>
        <line x1={15} y1={10} x2="15.01" y2={10}></line>
        <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
    </svg>
);

const IconList = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-list"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        stroke-width={2}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1={9} y1={6} x2={20} y2={6}></line>
        <line x1={9} y1={12} x2={20} y2={12}></line>
        <line x1={9} y1={18} x2={20} y2={18}></line>
        <line x1={5} y1={6} x2={5} y2="6.01"></line>
        <line x1={5} y1={12} x2={5} y2="12.01"></line>
        <line x1={5} y1={18} x2={5} y2="18.01"></line>
    </svg>
);

const IconCategory = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-category"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        stroke-width={2}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 4h6v6h-6z"></path>
        <path d="M14 4h6v6h-6z"></path>
        <path d="M4 14h6v6h-6z"></path>
        <circle cx={17} cy={17} r={3}></circle>
    </svg>
);

const IconUsers = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-users"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        stroke-width={2}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx={9} cy={7} r={4}></circle>
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
    </svg>
);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
    MantineProvider,
    Global,
    NotificationsProvider,
    LightTheme,
    Layout,
    // highlight-start
    Sider,
    NavLink,
    // highlight-end
} from "@pankod/refine-mantine";
import {
    IconList,
    IconCategory,
    IconUsers,
    // highlight-next-line
    IconMoodSmile,
} from "@tabler/icons";

import { PostList } from "./pages/posts";

const App = () => {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    Layout={Layout}
                    // highlight-start
                    Sider={() => (
                        <Sider
                            render={({ items }) => {
                                return (
                                    <>
                                        <NavLink
                                            label="Custom Element"
                                            icon={<IconMoodSmile />}
                                        />
                                        {items}
                                    </>
                                );
                            }}
                        />
                    )}
                    // highlight-end
                    resources={[
                        {
                            name: "posts",
                            list: DummyListPage,
                        },
                        {
                            name: "categories",
                            list: DummyListPage,
                            icon: <IconCategory />,
                        },
                        {
                            name: "users",
                            list: DummyListPage,
                            icon: <IconUsers />,
                        },
                    ]}
                />
            </NotificationsProvider>
        </MantineProvider>
    );
};
// visible-block-end
render(<App />);
```

:::tip
The `NavLink` component gives you an implemention ready component compatible with Sider menu items. If you want to add anything else to your `Sider` component, you can use the `collapsed` state to manage your component.
:::

## Recreating the Default Sider Menu

You can also customize your Sider component by creating the `CustomSider` component.

When you examine the code of the live-preview example below, you will see the same code that we used for the `default sider` component. You can create a customized `CustomSider` component for yourself by following this code.



[refine]: /api-reference/core/components/refine-config.md
[customlayout]: /api-reference/mantine/customization/layout.md
