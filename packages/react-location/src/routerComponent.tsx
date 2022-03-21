import React from "react";
import {
    useAuthenticated,
    useIsAuthenticated,
    useRefineContext,
    useResource,
    useRouterContext,
    LoginPage as DefaultLoginPage,
    LayoutWrapper,
    CanAccess,
    ErrorComponent,
    createTreeView,
    ITreeMenu,
} from "@pankod/refine-core";
import { rankRoutes } from "react-location-rank-routes";

import {
    Router,
    ReactLocation,
    Route,
    Navigate,
    useRouter,
    RouterProps,
    Outlet,
} from "react-location";

import { ResourceComponentWrapper } from "./resourceComponent";
import { RefineRouteProps } from "./index";

export const location = new ReactLocation();

export const RouterComponent: React.FC<RouterProps> = ({
    children,
    location: locationFromProps,
    ...rest
}) => {
    const { resources } = useResource();
    const treeMenu: ITreeMenu[] = createTreeView(resources);
    const { DashboardPage, catchAll, LoginPage } = useRefineContext();

    const { routes: customRoutes }: { routes: Route[] } = useRouterContext();

    const isAuthenticated = useIsAuthenticated();
    const { isLoading } = useAuthenticated({ type: "routeProvider" });

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        const routes: Route[] = [
            ...[...(customRoutes || [])],
            {
                path: "/",
                element: LoginPage ? <LoginPage /> : <DefaultLoginPage />,
            },
            {
                path: "/login",
                element: LoginPage ? <LoginPage /> : <DefaultLoginPage />,
            },
            {
                path: "*",
                element: <LoginNavigateWithToParam />,
            },
        ];

        return (
            <Router
                location={locationFromProps ?? location}
                {...rest}
                filterRoutes={rankRoutes as any}
                routes={routes}
            />
        );
    }

    const createNestedRoute = (item: ITreeMenu[]) => {
        const nestedMenu: Route[] = [];
        item.forEach((p: ITreeMenu) => {
            if (p.children.length > 0) {
                nestedMenu.push({
                    path: p.name,
                    children: [...createNestedRoute(p.children)],
                });
            } else {
                nestedMenu.push({
                    path: `:resource`,
                    children: [
                        {
                            path: "/",
                            element: <ResourceComponentWrapper />,
                        },
                    ],
                },
                {
                    path: `:resource/:action`,
                    children: [
                        {
                            path: "/",
                            element: <ResourceComponentWrapper />,
                        },
                    ],
                },
                {
                    path: `:resource/:action/:id`,
                    children: [
                        {
                            path: "/",
                            element: <ResourceComponentWrapper />,ç.
                        },
                    ],
                },);
            }
        });
        console.log(nestedMenu);

        return nestedMenu;
    };

    const routes: Route[] = [
        ...[...(customRoutes || [])].filter((p: RefineRouteProps) => !p.layout),
        {
            path: "/",
            element: (
                <LayoutWrapper>
                    <Outlet />
                </LayoutWrapper>
            ),
            children: [
                ...[...(customRoutes || [])].filter(
                    (p: RefineRouteProps) => p.layout,
                ),
                {
                    element: DashboardPage ? (
                        <CanAccess
                            resource="dashboard"
                            action="list"
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <DashboardPage />
                        </CanAccess>
                    ) : (
                        <Navigate to={`/${resources[0].route}`} />
                    ),
                },
                ...createNestedRoute(treeMenu),
                // cms/content/posts
                
            ],
        },
    ];

    console.log("routes", routes);

    return (
        <Router
            location={locationFromProps ?? location}
            {...rest}
            filterRoutes={rankRoutes as any}
            routes={routes}
        />
    );
};

const LoginNavigateWithToParam: React.FC = () => {
    const { state } = useRouter();

    return (
        <Navigate
            to={`/login`}
            search={{
                to: `${state.location.href}`,
            }}
        />
    );
};
