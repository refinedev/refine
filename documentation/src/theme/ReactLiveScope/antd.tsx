import React from "react";
import * as RefineCore from "@pankod/refine-core";
import * as RefineReactRouterV6 from "@pankod/refine-react-router-v6";
import * as RefineSimpleRest from "@pankod/refine-simple-rest";
import * as RefineAntd from "@pankod/refine-antd";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

const Refine = (props) => (
    <RefineCore.Refine
        {...props}
        options={{
            reactQuery: {
                devtoolConfig: false,
            },
        }}
    />
);

const antLayoutSider: React.CSSProperties = {
    position: "relative",
};
const antLayoutSiderMobile: React.CSSProperties = {
    position: "fixed",
    height: "100vh",
    zIndex: 999,
};

const RefineDemoReactRouterV6 = (
    initialRoutes?: string[],
): RefineCore.IRouterProvider => ({
    ...RefineReactRouterV6.default,
    RouterComponent: RefineReactRouterV6.MemoryRouterComponent.bind(null, {
        initialEntries: initialRoutes,
    }),
});

const RefineAntdCollapsedSider = () => {
    const [collapsed, setCollapsed] = React.useState<boolean>(true);
    const isExistAuthentication = RefineCore.useIsExistAuthentication();
    const { Link } = RefineCore.useRouterContext();
    const { mutate: logout } = RefineCore.useLogout();
    const Title = RefineCore.useTitle();
    const translate = RefineCore.useTranslate();
    const { menuItems, selectedKey, defaultOpenKeys } = RefineCore.useMenu();
    const breakpoint = RefineAntd.Grid.useBreakpoint();
    const { hasDashboard } = RefineCore.useRefineContext();

    const _initialCollapse = React.useRef(false);

    const isMobile =
        typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

    const RenderToTitle = Title ?? RefineAntd.Title;

    const renderTreeView = (
        tree: RefineCore.ITreeMenu[],
        selectedKey: string,
    ) => {
        return tree.map((item: RefineCore.ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;

            if (children.length > 0) {
                return (
                    <RefineAntd.Menu.SubMenu
                        key={route}
                        icon={
                            icon ?? <RefineAntd.Icons.UnorderedListOutlined />
                        }
                        title={label}
                    >
                        {renderTreeView(children, selectedKey)}
                    </RefineAntd.Menu.SubMenu>
                );
            }
            const isSelected = route === selectedKey;
            const isRoute = !(
                parentName !== undefined && children.length === 0
            );
            return (
                <RefineCore.CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <RefineAntd.Menu.Item
                        key={route}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
                        icon={
                            icon ??
                            (isRoute && (
                                <RefineAntd.Icons.UnorderedListOutlined />
                            ))
                        }
                    >
                        <Link to={route}>{label}</Link>
                        {!collapsed && isSelected && (
                            <div className="ant-menu-tree-arrow" />
                        )}
                    </RefineAntd.Menu.Item>
                </RefineCore.CanAccess>
            );
        });
    };

    return (
        <RefineAntd.AntdLayout.Sider
            collapsible
            collapsed={collapsed}
            defaultCollapsed={true}
            onCollapse={(collapsed: boolean): void => {
                if (_initialCollapse.current) {
                    setCollapsed(collapsed);
                } else {
                    _initialCollapse.current = true;
                }
            }}
            collapsedWidth={isMobile ? 0 : 80}
            breakpoint="lg"
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <RenderToTitle collapsed={collapsed} />
            <RefineAntd.Menu
                selectedKeys={[selectedKey]}
                defaultOpenKeys={defaultOpenKeys}
                mode="inline"
                onClick={() => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }
                }}
            >
                {hasDashboard ? (
                    <RefineAntd.Menu.Item
                        key="dashboard"
                        style={{
                            fontWeight: selectedKey === "/" ? "bold" : "normal",
                        }}
                        icon={<RefineAntd.Icons.DashboardOutlined />}
                    >
                        <Link to="/">
                            {translate("dashboard.title", "Dashboard")}
                        </Link>
                        {!collapsed && selectedKey === "/" && (
                            <div className="ant-menu-tree-arrow" />
                        )}
                    </RefineAntd.Menu.Item>
                ) : null}

                {renderTreeView(menuItems, selectedKey)}

                {isExistAuthentication && (
                    <RefineAntd.Menu.Item
                        key="logout"
                        onClick={() => logout()}
                        icon={<RefineAntd.Icons.LogoutOutlined />}
                    >
                        {translate("buttons.logout", "Logout")}
                    </RefineAntd.Menu.Item>
                )}
            </RefineAntd.Menu>
        </RefineAntd.AntdLayout.Sider>
    );
};

const RefineAntdDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    return (
        <RefineCore.Refine
            routerProvider={RefineDemoReactRouterV6(initialRoutes)}
            dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
            notificationProvider={RefineAntd.notificationProvider}
            Layout={RefineAntd.Layout}
            Sider={() => null}
            catchAll={<RefineAntd.ErrorComponent />}
            options={{
                disableTelemetry: true,
                reactQuery: {
                    devtoolConfig: false,
                },
            }}
            {...rest}
        />
    );
};

export const Antd = {
    RefineAntdDemo,
    RefineAntd,
    RefineCore: {
        ...RefineCore,
        Refine,
    },
    RefineReactRouterV6,
    RefineSimpleRest,
    RefineDemoReactRouterV6,
};
