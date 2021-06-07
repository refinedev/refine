---
id: useMenu
title: useMenu
---

`useMenu` is used to get menu items of the default sidebar. These items include a link to dashboard page (if it exists) and links to user defined resources (passed as children to `<Admin>`). This hook can be used to build custom menus - which is also used by default sidebar to show menu items.

```ts
const { selectedKey, resources, menuItems } = useMenu();

console.log(menuItems); 

// Example output:
// [
//     {
//         icon: {$$typeof: Symbol(react.element), …},
//         key: "dashboard",
//         label: "Dashboard",
//         name: "Dashboard",
//         route: "/"
//     }, {
//         icon: {$$typeof: Symbol(react.element), …},
//         key: "/resources/posts",
//         label: "Posts",
//         name: "posts",
//         route: "/resources/posts",
//         ...
//     }, {
//         icon: {$$typeof: Symbol(react.element), …},
//         key: "/resources/categories",
//         label: "Categories",
//         name: "categories",
//         route: "/resources/categories",
//         ...
//     },
//     ...
// ]
```

## Usage

We'll show the basic use of `useMenu` to create a custom sider menu that is identical to default sider menu.

We can override the default sider and show a different component in its place by passing a custom component to `<Admin>`s `Sider` prop:

```tsx title="App.tsx"
import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";
import { CustomMenu } from "./CustomMenu";

const API_URL = "https://refine-fake-rest.pankod.com";

const App: React.FC = () => {
    return (
        //highlight-next-line
        <Admin dataProvider={dataProvider(API_URL)} Sider={CustomMenu}>
            <Resource name="posts" list={PostList} />
        </Admin>
    );
};

export default App;
```

And we define `<CustomMenu>`:

```tsx title="src/CustomMenu.tsx"
import React from "react";
import {
    AntdLayout,
    Menu,
    Icons,
    Link,
    useNavigation,
    useMenu,
    useLogout,
    useTitle,
} from "@pankod/refine";

export const CustomMenu: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const logout = useLogout();
    const Title = useTitle();
    const { push } = useNavigation();
    //highlight-next-line
    const { menuItems, selectedKey } = useMenu();

    return (
        <AntdLayout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
        >
            <Title collapsed={collapsed} />
            <Menu
                theme="dark"
                defaultSelectedKeys={["dashboard"]}
                selectedKeys={[selectedKey]}
                mode="inline"
            >
                //highlight-start
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}
                //highlight-end

                {logout && (
                    <Menu.Item
                        onClick={() => {
                            logout().then(() => push("/login"));
                        }}
                        key="logout"
                        icon={<Icons.LogoutOutlined />}
                    >
                        Logout
                    </Menu.Item>
                )}
            </Menu>
        </AntdLayout.Sider>
    );
};
```

This is how the default sidebar shows menu items.

```ts title="src/CustomMenu.tsx"
...
const [collapsed, setCollapsed] = React.useState(false);
const logout = useLogout();
const Title = useTitle();
const { push } = useNavigation();
//highlight-next-line
const { menuItems, selectedKey } = useMenu();
...
```

`useMenu` hook is used to get style agnostic menu items.

We get `Title` component with `useTitle` hook, logout functionality with `useLogout` hook, a `push` function from `useNavigation` for directing users to homepage after logging out and a basic boolean state (`collapsed`) for tracking whether the collapsible menu is collapsed or not.

```ts
{menuItems.map(({ icon, route, label }) => (
    <Menu.Item key={route} icon={icon}>
        <Link to={route}>{label}</Link>
    </Menu.Item>
))}
```

We render menu items as we wish.

```ts title="src/CustomMenu.tsx"
...
{logout && (
    <Menu.Item
        onClick={() => {
            logout().then(() => push("/login"));
        }}
        key="logout"
        icon={<Icons.LogoutOutlined />}
    >
        Logout
    </Menu.Item>
)}
...
```

A logout button that logs the user out and redirects them to `/login` page.

:::tip
If `logout` (returned from `useLogout` hook) is a truhy value, that means there auth provider is implemented.
[Refer to Auth Provider docs for more detailed information. &#8594](guides-and-concepts/providers/auth-provider.md)
:::

## API Reference

### Properties

> `*`: These props have default values in `AdminContext` and can also be set on **<[Admin](#)>** component. `useForm` will use what is passed to `<Admin>` as default and can override locally.

<br/>

### Return values
