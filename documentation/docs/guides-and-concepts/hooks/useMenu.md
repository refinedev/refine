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
//         icon: ReactElement,
//         key: "dashboard",
//         label: "Dashboard",
//         name: "Dashboard",
//         route: "/"
//     }, {
//         icon: ReactElement,
//         key: "/resources/posts",
//         label: "Posts",
//         name: "posts",
//         route: "/resources/posts",
//         ...
//     }, {
//         icon: ReactElement,
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

`menuItems` is a list of style agnostic menu items. Each of them has a key. `selectedKey` (inferred from route) is the key of the page/resource user is viewing at the moment. `resources` is the list of resources the developer have defined.

### Recreating the default sider menu

We'll show the basic use of `useMenu` to create a custom sider menu that is identical to default sider menu.

We can override the default sider and show a different component in its place by passing a custom component to `<Admin>`s `Sider` prop:

```tsx title="App.tsx"
import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";
//highlight-next-line
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
import { AntdLayout, Menu, Link, useMenu, useTitle } from "@pankod/refine";

export const CustomMenu: React.FC = () => {
    const Title = useTitle();
    //highlight-next-line
    const { menuItems, selectedKey } = useMenu();

    return (
        <AntdLayout.Sider>
            <Title collapsed={false} />
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
            </Menu>
        </AntdLayout.Sider>
    );
};
```

`useMenu` hook is used to get style agnostic menu items. We render these items in the body of the sider. We get `Title` component with `useTitle` hook.

We can also add a logout button:

```tsx title="src/CustomMenu.tsx"
import React from "react";
import {
    AntdLayout,
    Menu,
    Link,
    useMenu,
    useTitle,
    //highlight-start
    Icons,
    useNavigation,
    useLogout,
    //highlight-end
} from "@pankod/refine";

export const CustomMenu: React.FC = () => {
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();
    //highlight-start
    const logout = useLogout();
    const { push } = useNavigation();
    //highlight-end

    return (
        <AntdLayout.Sider>
            <Title collapsed={false} />
            <Menu
                theme="dark"
                defaultSelectedKeys={["dashboard"]}
                selectedKeys={[selectedKey]}
                mode="inline"
            >
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}

                //highlight-start
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
                //highlight-end
            </Menu>
        </AntdLayout.Sider>
    );
};
```

`useLogout` provides the logout functionality. We also have a `push` function from `useNavigation` for directing users to homepage after logging out.

:::tip
If `logout` (returned from `useLogout` hook) is a truhy value, that means auth provider is implemented.  
[Refer to Auth Provider docs for more detailed information. &#8594](guides-and-concepts/providers/auth-provider.md)
:::

:::tip
You can further customize Sider and its appearance.  
[Refer to Ant Design docs for more detailed information about Sider. &#8594](https://ant.design/components/layout/#Layout.Sider)
:::

## API Reference

### Return values

| Property        | Description                                             | Type                                                             |
| --------------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| setEditId       | `editId` setter                                         | `Dispatch<SetStateAction<` `string` \| `number` \| `undefined>>` |
