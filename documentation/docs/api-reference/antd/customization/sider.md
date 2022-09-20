---
id: antd-custom-sider
title: Sider
---

There are 2 ways that will allow you to customize your `<Sider />` component if you need it.

You can access the `logout`, `dashboard`, `items` elements and `collapsed` state that we use in our default `Sider` component by using `render` properties. Customize it to your needs or you can create a custom `<Sider />` component and use it either by passing it to [`<Refine />`][refine] or using a [Custom Layout][antdcustomlayout].

## Customize Sider by Using `render` property

```tsx live previewHeight=360px hideCode disableScroll url=http://localhost:3000/posts
const {
    AntdLayout,
    Grid,
    Menu,
    Icons,
    Title: DefaultTitle,
    Sider,
    Header,
} = RefineAntd;
const {
    useTranslate,
    useLogout,
    useTitle,
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useRouterContext,
    useMenu,
    useRefineContext,
} = RefineCore;
import { Header } from "@pankod/refine-antd";

// visible-block-start
import {
    useTranslate,
    useLogout,
    useTitle,
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useRouterContext,
    useMenu,
    useRefineContext,
} from "@pankod/refine-core";
import {
    AntdLayout,
    Grid,
    Icons,
    Title as DefaultTitle,
    Menu,
    Sider,
} from "@pankod/refine-antd";
export type SiderRenderProps = {
    items: JSX.Element[];
    logout: React.ReactNode;
    dashboard: React.ReactNode;
};

export type RefineLayoutSiderProps = {
    render?: (props: SiderRenderProps) => React.ReactNode;
};

const PostList: React.FC = () => {
    return <div>Post List</div>;
};

const App: React.FC = () => {
    const API_URL = "https://api.fake-rest.refine.dev";

    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
            Sider={Sider}
            Layout={({ children, Footer, Header, Sider, OffLayoutArea }) => {
                return (
                    <AntdLayout
                        style={{ minHeight: "100vh", flexDirection: "row" }}
                    >
                        <Sider
                            render={({ items }) => {
                                return (
                                    <>
                                        <Menu.Item
                                            style={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            Custom Element
                                        </Menu.Item>
                                        {items}
                                    </>
                                );
                            }}
                        />
                        <AntdLayout>
                            {Header && <Header />}
                            <AntdLayout.Content>
                                <div
                                    style={{
                                        padding: 12,
                                        minHeight: 360,
                                    }}
                                >
                                    {children}
                                </div>
                                {OffLayoutArea && <OffLayoutArea />}
                            </AntdLayout.Content>
                            {Footer && <Footer />}
                        </AntdLayout>
                    </AntdLayout>
                );
            }}
        />
    );
};

// visible-block-end
// Header and sider components import from antd package at the part of invisible code block to avoid getting render error
// They are declared as null in ReactLiveScope
render(
    <RefineAntdDemo
        Layout={({ children, Footer, OffLayoutArea }) => {
            return (
                <AntdLayout
                    style={{ minHeight: "100vh", flexDirection: "row" }}
                >
                    <Sider
                        render={({ items }) => {
                            return (
                                <>
                                    <Menu.Item
                                        style={{
                                            fontWeight: 700,
                                        }}
                                    >
                                        Custom Element
                                    </Menu.Item>
                                    {items}
                                </>
                            );
                        }}
                    />
                    <AntdLayout>
                        <Header />
                        <AntdLayout.Content>
                            <div
                                style={{
                                    padding: 12,
                                    minHeight: 360,
                                }}
                            >
                                {children}
                            </div>
                            {OffLayoutArea && <OffLayoutArea />}
                        </AntdLayout.Content>
                        {Footer && <Footer />}
                    </AntdLayout>
                </AntdLayout>
            );
        }}
        initialRoutes={["/posts"]}
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
    />,
);
```

:::tip
The `Menu.Item` component gives you an implemention ready component compatible with Sider menu items. If you want to add anything else to your `Sider` component, you can use the `collapsed` state to manage your component.
:::

## Recreating the Default Sider Menu

You can also customize your Sider component by creating the `CustomSider` component.

When you examine the code of the live-preview example below, you will see the same code that we used for the `default sider` component. You can create a customized `CustomSider` component for yourself by following this code.

```tsx live hideCode disableScroll url=http://localhost:3000/posts
const { AntdLayout, Grid, Menu, Icons, Title: DefaultTitle } = RefineAntd;
const {
    useTranslate,
    useLogout,
    useTitle,
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useRouterContext,
    useMenu,
    useRefineContext,
} = RefineCore;

// visible-block-start
import {
    useTranslate,
    useLogout,
    useTitle,
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useRouterContext,
    useMenu,
    useRefineContext,
} from "@pankod/refine-core";
import {
    AntdLayout,
    Grid,
    Icons,
    Title as DefaultTitle,
} from "@pankod/refine-antd";
export type SiderRenderProps = {
    items: JSX.Element[];
    logout: React.ReactNode;
    dashboard: React.ReactNode;
};

export type RefineLayoutSiderProps = {
    render?: (props: SiderRenderProps) => React.ReactNode;
};

const PostList: React.FC = () => {
    return <div>Post List</div>;
};

const { DashboardOutlined, LogoutOutlined, UnorderedListOutlined } = Icons;

const CustomSider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const isExistAuthentication = useIsExistAuthentication();
    const { Link } = useRouterContext();
    const { mutate: mutateLogout } = useLogout();
    const Title = useTitle();
    const translate = useTranslate();
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const breakpoint = Grid.useBreakpoint();
    const { hasDashboard } = useRefineContext();

    const isMobile =
        typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

    const RenderToTitle = Title ?? DefaultTitle;

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;

            if (children.length > 0) {
                return (
                    <CanAccess
                        key={route}
                        resource={name.toLowerCase()}
                        action="list"
                        params={{
                            resource: item,
                        }}
                    >
                        <SubMenu
                            key={route}
                            icon={icon ?? <UnorderedListOutlined />}
                            title={label}
                        >
                            {renderTreeView(children, selectedKey)}
                        </SubMenu>
                    </CanAccess>
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
                    params={{
                        resource: item,
                    }}
                >
                    <Menu.Item
                        key={route}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
                        icon={icon ?? (isRoute && <UnorderedListOutlined />)}
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

    const logout = isExistAuthentication ? (
        <Menu.Item
            key="logout"
            onClick={() => mutateLogout()}
            icon={<LogoutOutlined />}
        >
            {translate("buttons.logout", "Logout")}
        </Menu.Item>
    ) : null;

    const dashboard = hasDashboard ? (
        <Menu.Item
            key="dashboard"
            style={{
                fontWeight: selectedKey === "/" ? "bold" : "normal",
            }}
            icon={<DashboardOutlined />}
        >
            <Link to="/">{translate("dashboard.title", "Dashboard")}</Link>
            {!collapsed && selectedKey === "/" && (
                <div className="ant-menu-tree-arrow" />
            )}
        </Menu.Item>
    ) : null;

    const items = renderTreeView(menuItems, selectedKey);

    const renderSider = () => {
        if (render) {
            return render({
                dashboard,
                items,
                logout,
            });
        }
        return (
            <>
                {dashboard}
                {items}
                {logout}
            </>
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
                selectedKeys={[selectedKey]}
                defaultOpenKeys={defaultOpenKeys}
                mode="inline"
                onClick={() => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }
                }}
            >
                {renderSider()}
            </Menu>
        </AntdLayout.Sider>
    );
};

const App: React.FC = () => {
    const API_URL = "https://api.fake-rest.refine.dev";

    return (
        <Refine
            // highlight-next-line
            Sider={CustomSider}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};

// visible-block-end

render(
    <RefineAntdDemo
        Sider={CustomSider}
        initialRoutes={["/posts"]}
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
    />,
);
```

<br />

:::tip
If you want to create a multi-level menu, you can take a look at this [`multi-level menu`](/docs/examples/multi-level-menu/multi-level-menu.md) example and also [`here`](/docs/advanced-tutorials/multi-level-menu/multi-level-menu.md) is the guide.
:::

`useLogout` provides the logout functionality.

:::caution
`useLogout` hook can only be used if the `authProvider` is provided.  
[Refer to authProvider docs for more detailed information. &#8594](/api-reference/core/providers/auth-provider.md)  
[Refer to useLogout docs for more detailed information. &#8594](/api-reference/core/hooks/auth/useLogout.md)
:::

:::tip
You can further customize the Sider and its appearance.  
[Refer to Ant Design docs for more detailed information about Sider. &#8594](https://ant.design/components/layout/#Layout.Sider)
:::

[refine]: /api-reference/core/components/refine-config.md
[antdcustomlayout]: /api-reference/antd/customization/layout.md
