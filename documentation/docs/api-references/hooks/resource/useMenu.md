---
id: useMenu
title: useMenu
---

`useMenu` is used to get menu items of the default sidebar. These items include a link to dashboard page (if it exists) and links to user defined resources (passed as children to `<Refine>`). This hook can be used to build custom menus - which is also used by default sidebar to show menu items.

```ts
const { selectedKey, menuItems } = useMenu();
```

* `menuItems` is a list of style agnostic menu items. Each of them has a key.
* `selectedKey` is key of the resource user is viewing at the moment. Inferred from route.

## Usage

### Recreating the default sider menu

We'll show the basic use of `useMenu` to create a custom sider menu that is identical to default sider menu.

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
                //highlight-next-line
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

<br />

We can override the default sider and show the custom menu we implemented in its place by passing a the custom component to `<Refine>`s `Sider` prop:

```tsx title="App.tsx"
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";
//highlight-next-line
import { CustomMenu } from "./CustomMenu";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        //highlight-next-line
        <Refine dataProvider={dataProvider(API_URL)} Sider={CustomMenu}>
            <Resource name="posts" list={PostList} />
        </Refine>
    );
};

export default App;
```

<br />

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
    const { isProvided } = useContext<IAuthContext>(AuthContext);
    const { mutate: logout } = useLogout();
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
                onClick={({ key }) => {
                    if (key === "logout") {
                        logout();
                        return;
                    }

                    push(key as string);
                }}
            >
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}

                //highlight-start
                {isProvided && (
                    <Menu.Item key="logout" icon={<Icons.LogoutOutlined />}>
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

:::caution
`useLogout` hook can only be used if `authProvider` is provided.  
[Refer to Auth Provider docs for more detailed information. &#8594](../../providers/auth-provider.md)  
[Refer to useLogout docs for more detailed information. &#8594](api-references/hooks/auth/useLogout.md)
:::

:::tip
You can further customize Sider and its appearance.  
[Refer to Ant Design docs for more detailed information about Sider. &#8594](https://ant.design/components/layout/#Layout.Sider)
:::
## API Reference

### Return values

| Property    | Description                                                                    | Type                             |
| ----------- | ------------------------------------------------------------------------------ | -------------------------------- |
| selectedKey | Key of the resource the user is viewing at the moment                          | `string`                         |
| menuItems   | List of keys and routes and some metadata of resources and dashboard if exists | [`IMenuItem[]`](#interfaces)     |

#### Interfaces

```ts
interface IResourceItem {
    name: string;
    label?: string;
    route?: string;
    icon?: ReactNode;
}

type IMenuItem = IResourceItem & {
    key: string;
};
```
