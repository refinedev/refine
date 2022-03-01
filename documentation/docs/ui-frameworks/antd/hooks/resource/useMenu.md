---
id: useMenu
title: useMenu
---

`useMenu` is used to get menu items of the default sidebar. These items include a link to dashboard page (if it exists) and links to the user defined resources (passed as children to `<Refine>`).
This hook can also be used to build custom menus, which is also used by default sidebar to show menu items.

```ts
const { selectedKey, menuItems } = useMenu();
```

-   `menuItems` is a list of style agnostic menu items. Each of them has a key.
-   `selectedKey` is the key of the resource user is viewing at the moment. Its inferred from the route.

## Usage

### Recreating the Default Sider Menu

We will show you how to use `useMenu` to create a custom sider menu that is identical to default sider menu.

First we define `<CustomMenu>`:

```tsx  title="src/CustomMenu.tsx"
import { useState, CSSProperties } from "react";
import { useTitle } from "@pankod/refine-core";
import {
    AntdLayout,
    Menu,
    Grid,
    Link,
// highlight-next-line
    useMenu,
} from "@pankod/refine-antd";

export const CustomMenu: React.FC = () => {
    const Title = useTitle();
// highlight-next-line
    const { menuItems, selectedKey } = useMenu();

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const breakpoint = Grid.useBreakpoint();
    const isMobile = !breakpoint.lg;

    return (
        <AntdLayout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            collapsedWidth={isMobile ? 0 : 80}
            breakpoint="lg"
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            {Title && <Title collapsed={collapsed} />}
// highlight-start
            <Menu selectedKeys={[selectedKey]} mode="inline">
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
// highlight-end
        </AntdLayout.Sider>
    );
};

const antLayoutSider: CSSProperties = {
    position: "relative",
};
const antLayoutSiderMobile: CSSProperties = {
    position: "fixed",
    height: "100vh",
    zIndex: 999,
};
```

`useMenu` hook is used to get style agnostic menu items. We render these items in the body of the sider. We get the `Title` component with the `useTitle` hook.

<br />

We can override the default sider and show the custom menu we implemented in its place by passing a the custom component to `<Refine>`s `Sider` prop:

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";

// highlight-next-line
import { CustomMenu } from "./CustomMenu";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
// highlight-next-line
            Sider={CustomMenu}
            resources={[{ name: "posts", list: PostList }]}
        />
    );
};

export default App;
```

<br />

We can also add a logout button:

```tsx  title="src/CustomMenu.tsx"
import { useState, CSSProperties } from "react";
import { useTitle } from "@pankod/refine-core";
import {
    AntdLayout,
    Menu,
    Link,
    Grid,
// highlight-start
    Icons,
    useNavigation,
    useLogout,
// highlight-end
    useMenu,
} from "@pankod/refine-antd";

export const CustomMenu: React.FC = () => {
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const breakpoint = Grid.useBreakpoint();
    const isMobile = !breakpoint.lg;

// highlight-start
    const { mutate: logout } = useLogout();
    const { push } = useNavigation();
// highlight-end

    return (
        <AntdLayout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            collapsedWidth={isMobile ? 0 : 80}
            breakpoint="lg"
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            {Title && <Title collapsed={collapsed} />}
            <Menu
                selectedKeys={[selectedKey]}
                mode="inline"
// highlight-start
                onClick={({ key }) => {
                    if (key === "logout") {
                        logout();
                        return;
                    }

                    push(key as string);
                }}
// highlight-end
            >
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}

// highlight-start
                <Menu.Item key="logout" icon={<Icons.LogoutOutlined />}>
                    Logout
// highlight-end
                </Menu.Item>
            </Menu>
        </AntdLayout.Sider>
    );
};

const antLayoutSider: CSSProperties = {
    position: "relative",
};
const antLayoutSiderMobile: CSSProperties = {
    position: "fixed",
    height: "100vh",
    zIndex: 999,
};
```

`useLogout` provides the logout functionality. We also have a `push` function from `useNavigation` for directing users to homepage after logging out.

:::caution
`useLogout` hook can only be used if the `authProvider` is provided.  
[Refer to authProvider docs for more detailed information. &#8594](/core/providers/auth-provider.md)  
[Refer to useLogout docs for more detailed information. &#8594](/core/hooks/auth/useLogout.md)
:::

:::tip
You can further customize the Sider and its appearance.  
[Refer to Ant Design docs for more detailed information about Sider. &#8594](https://ant.design/components/layout/#Layout.Sider)
:::

## API Reference

### Return values

| Property    | Description                                                                             | Type                         |
| ----------- | --------------------------------------------------------------------------------------- | ---------------------------- |
| selectedKey | Key of the resource the user is viewing at the moment                                   | `string`                     |
| menuItems   | List of keys and routes and some metadata of resources and also the dashboard if exists | [`IMenuItem[]`](#interfaces) |

#### Interfaces

```ts
interface IResourceItem extends IResourceComponents {
    name: string;
    label?: string;
    route?: string;
    icon?: ReactNode;
    canCreate?: boolean;
    canEdit?: boolean;
    canShow?: boolean;
    canDelete?: boolean;
}

interface IResourceComponents {
    list?: React.FunctionComponent<IResourceComponentsProps>;
    create?: React.FunctionComponent<IResourceComponentsProps>;
    edit?: React.FunctionComponent<IResourceComponentsProps>;
    show?: React.FunctionComponent<IResourceComponentsProps>;
}

interface IResourceComponentsProps<TCrudData = any> {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    name?: string;
    initialData?: TCrudData;
}

type IMenuItem = IResourceItem & {
    key: string;
};
```
