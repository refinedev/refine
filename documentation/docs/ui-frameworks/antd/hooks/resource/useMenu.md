---
id: useMenu
title: useMenu
---

`useMenu` is used to get menu items of the default sidebar. These items include a link to dashboard page (if it exists) and links to the user defined resources (passed as children to `<Refine>`).
This hook can also be used to build custom menus, which is also used by default sidebar to show menu items.

```ts
const { selectedKey, menuItems, defaultOpenKeys } = useMenu();
```

-   `menuItems` is a list of style agnostic menu items. Each of them has a key.
-   `selectedKey` is the key of the resource user is viewing at the moment. Its inferred from the route.
-   `defaultOpenKeys` is the array with the keys of default opened menus.

## Usage

### Recreating the Default Sider Menu

We will show you how to use `useMenu` to create a custom sider menu that is identical to default sider menu.

First we define `<CustomMenu>`:

```tsx  title="src/CustomMenu.tsx"
import { useState, CSSProperties } from "react";
import { useTitle, ITreeMenu, CanAccess, useRouterContext } from "@pankod/refine-core";
import {
    AntdLayout,
    Menu,
    Grid,
    Icons,
// highlight-next-line
    useMenu,
} from "@pankod/refine-antd";

export const CustomMenu: React.FC = () => {
    const Title = useTitle();
    const { Link } = useRouterContext();
    const { SubMenu } = Menu;

// highlight-next-line
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const breakpoint = Grid.useBreakpoint();
    const isMobile = !breakpoint.lg;

    const RenderToTitle = Title ?? DefaultTitle;

// highlight-start
    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;

            if (children.length > 0) {
                return (
                    <SubMenu
                        key={name}
                        icon={icon ?? <Icons.UnorderedListOutlined />}
                        title={label}
                    >
                        {renderTreeView(children, selectedKey)}
                    </SubMenu>
                );
            }
            const isSelected = route === selectedKey;
            const isRoute = !(
                parentName !== undefined && children.length === 0
            );
            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                >
                    <Menu.Item
                        key={selectedKey}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
                        icon={icon ?? (isRoute && <Icons.UnorderedListOutlined />)}
                    >
                        <Link to={route}>{label}</Link>
                        {!collapsed && isSelected && (
                            <div className="ant-menu-tree-arrow" />
                        )}
                    </Menu.Item>
                </CanAccess>
            );
        });
    };
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
            <RenderToTitle collapsed={collapsed} />
// highlight-start
            <Menu 
                defaultOpenKeys={defaultOpenKeys} 
                selectedKeys={[selectedKey]} 
                mode="inline"
                onClick={() => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }
                }}
                >
               {renderTreeView(menuItems, selectedKey)}
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

`useMenu` hook is used to get style agnostic menu items. We render these items in the body of the sider. We create a recursive `renderTreeView` function to create menu items from the list of resources passed to `<Refine>`. We get the `Title` component with the `useTitle` hook.

<br />

:::tip
If you want to create a multi-level menu, you can take a look at this [`multi-level menu`](/docs/examples/multi-level-menu/multi-level-menu/) example and also [`here`](/docs/guides-and-concepts/multi-level-menu/multi-level-menu/) is the guide.
:::

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
import { useTitle, useRouterContext } from "@pankod/refine-core";
import {
    AntdLayout,
    Menu,
    Link,
    Grid,
// highlight-start
    Icons,
    useLogout,
// highlight-end
    useMenu,
} from "@pankod/refine-antd";

export const CustomMenu: React.FC = () => {
    const Title = useTitle();
    const { Link } = useRouterContext();
    const { menuItems, selectedKey } = useMenu();

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const breakpoint = Grid.useBreakpoint();
    const isMobile = !breakpoint.lg;

    const RenderToTitle = Title ?? DefaultTitle;

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;

            if (children.length > 0) {
                return (
                    <SubMenu
                        key={name}
                        icon={icon ?? <Icons.UnorderedListOutlined />}
                        title={label}
                    >
                        {renderTreeView(children, selectedKey)}
                    </SubMenu>
                );
            }
            const isSelected = route === selectedKey;
            const isRoute = !(
                parentName !== undefined && children.length === 0
            );
            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                >
                    <Menu.Item
                        key={selectedKey}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
                        icon={icon ?? (isRoute && <Icons.UnorderedListOutlined />)}
                    >
                        <Link to={route}>{label}</Link>
                        {!collapsed && isSelected && (
                            <div className="ant-menu-tree-arrow" />
                        )}
                    </Menu.Item>
                </CanAccess>
            );
        });
    };

// highlight-start
    const { mutate: logout } = useLogout();
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
            <RenderToTitle collapsed={collapsed} />
            <Menu
                defaultOpenKeys={defaultOpenKeys} 
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={() => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }
                }}
            >
                {renderTreeView(menuItems, selectedKey)}
// highlight-start
                <Menu.Item 
                    key="logout" 
                    onClick={() => logout()} 
                    icon={<Icons.LogoutOutlined />}
                >
                    Logout
                </Menu.Item>
// highlight-end
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

`useLogout` provides the logout functionality.

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

| Property        | Description                                                                             | Type                         |
| --------------- | --------------------------------------------------------------------------------------- | ---------------------------- |
| selectedKey     | Key of the resource the user is viewing at the moment                                   | `string`                     |
| menuItems       | List of keys and routes and some metadata of resources and also the dashboard if exists | [`ITreeMenu[]`](#interfaces) |
| defaultOpenKeys | Array with the keys of default opened menus.                                            | `string[]`                   |

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
    parentName?: string;
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

type ITreeMenu = IMenuItem & {
    children: ITreeMenu[];
};
```
