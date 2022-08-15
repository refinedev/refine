import React from "react";
import * as RefineCore from "@pankod/refine-core";
import * as RefineReactRouterV6 from "@pankod/refine-react-router-v6";
import * as RefineAntd from "@pankod/refine-antd";
import * as RefineMui from "@pankod/refine-mui";
import * as RefineSimpleRest from "@pankod/refine-simple-rest";
import * as RefineReactHookForm from "@pankod/refine-react-hook-form";
import * as RefineReactTable from "@pankod/refine-react-table";

import "@pankod/refine-antd/dist/antd.min.css";

export const packageMap = {
    "@pankod/refine-core": "RefineCore",
    "@pankod/refine-react-router-v6": "RefineReactRouterV6",
    "@pankod/refine-antd": "RefineAntd",
    "@pankod/refine-mui": "RefineMui",
    "@pankod/refine-simple-rest": "RefineSimpleRest",
    "@pankod/refine-react-hook-form": "RefineReactHookForm",
    "@pankod/refine-react-table": "RefineReactTable",
};

const packageRegex =
    /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g;

const sideEffectRegex = /import[ \n\t](?:['"])([^'"\n]+)(['"])/g;

// const nameChangeRegex = /((?:\w|\s|_)*)( as )((?:\w|\s|_)*)( |,)?/g;

// const getPackageByName = (packageName: string) => {
//     return packageMap[packageName.replace('"', "")];
// };

export const importReplacer = (code: string): string => {
    let modified = `${code}`;
    let match: (string | undefined)[];

    while ((match = packageRegex.exec(code))) {
        const [
            line /* _defaultImport, _moduleImport, _asteriskImport, _packageName */,
        ] = match;

        modified = modified.replace(line, "");

        // if (defaultImport) {
        // const newLine = `const { ${
        //     defaultImport ? `default: ${defaultImport}` : ""
        // } } = ${getPackageByName(packageName)}`;

        // modified = modified.replace(line, newLine);
        // }

        // if (moduleImport) {
        // const newLine = `const ${moduleImport.replace(
        //     nameChangeRegex,
        //     `$1: $3$4`,
        // )} = ${getPackageByName(packageName)}`;

        //     modified = modified.replace(line, newLine);
        // }

        // if (asteriskImport) {
        // const newLine = `const ${asteriskImport} = ${getPackageByName(
        //     packageName,
        // )}`;

        //     modified = modified.replace(line, newLine);
        // }
    }

    while ((match = sideEffectRegex.exec(code))) {
        const [line] = match;

        modified = modified.replace(line, "");
    }

    return modified;
};

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

const Refine = (props) => (
    <RefineCore.Refine {...props} reactQueryDevtoolConfig={false} />
);

const RefineDemoReactRouterV6 = (
    initialRoutes?: string[],
): RefineCore.IRouterProvider => ({
    ...RefineReactRouterV6.default,
    RouterComponent: RefineReactRouterV6.MemoryRouterComponent.bind(null, {
        initialEntries: initialRoutes,
    }),
});

const antLayoutSider: React.CSSProperties = {
    position: "relative",
};
const antLayoutSiderMobile: React.CSSProperties = {
    position: "fixed",
    height: "100vh",
    zIndex: 999,
};

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
            Sider={RefineAntdCollapsedSider}
            catchAll={<RefineAntd.ErrorComponent />}
            disableTelemetry={true}
            reactQueryDevtoolConfig={false}
            {...rest}
        />
    );
};

const RefineHeadlessDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    return (
        <RefineCore.Refine
            routerProvider={RefineDemoReactRouterV6(initialRoutes)}
            dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
            disableTelemetry={true}
            reactQueryDevtoolConfig={false}
            {...rest}
        />
    );
};

const RefineMuiDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    return (
        <RefineMui.ThemeProvider theme={RefineMui.LightTheme}>
            <RefineMui.CssBaseline />
            <RefineMui.GlobalStyles
                styles={{ html: { WebkitFontSmoothing: "auto" } }}
            />
            <RefineMui.RefineSnackbarProvider>
                <RefineCore.Refine
                    routerProvider={RefineDemoReactRouterV6(initialRoutes)}
                    dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
                    notificationProvider={RefineMui.notificationProvider}
                    Layout={RefineMui.Layout}
                    catchAll={<RefineMui.ErrorComponent />}
                    disableTelemetry={true}
                    reactQueryDevtoolConfig={false}
                    {...rest}
                />
            </RefineMui.RefineSnackbarProvider>
        </RefineMui.ThemeProvider>
    );
};

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
    RefineCore: {
        ...RefineCore,
        Refine,
    },
    RefineSimpleRest,
    RefineReactRouterV6,
    RefineAntd,
    RefineMui,
    RefineHeadlessDemo,
    RefineAntdDemo,
    RefineMuiDemo,
    RefineDemoReactRouterV6,
    RefineReactHookForm,
    RefineReactTable,
};
export default ReactLiveScope;
