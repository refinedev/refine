import React from "react";
import {
    useAuthenticated,
    useRefineContext,
    useResource,
    useRouterContext,
    LoginPage as DefaultLoginPage,
    LayoutWrapper,
    CanAccess,
    ErrorComponent,
} from "@pankod/refine-core";
import { rankRoutes } from "@tanstack/react-location-rank-routes";

import {
    Router,
    ReactLocation,
    Route,
    Navigate,
    useRouter,
    RouterProps,
    Outlet,
} from "@tanstack/react-location";

import { ResourceComponentWrapper } from "./resourceComponent";
import { RefineRouteProps } from "./index";

export const location = new ReactLocation();

export function RouterComponent(
    this: { initialRoute?: string },
    { children: _children, location: locationFromProps, ...rest }: RouterProps,
): JSX.Element | null {
    const { resources } = useResource();
    const { DashboardPage, catchAll, LoginPage } = useRefineContext();

    const { routes: customRoutes }: { routes: Route[] } = useRouterContext();

    const { isFetching, isError } = useAuthenticated({
        type: "routeProvider",
    });

    if (isFetching) {
        return null;
    }

    const isAuthenticated = isError ? false : true;

    const renderLoginRouteElement = (): JSX.Element => {
        if (LoginPage) return <LoginPage />;
        return <DefaultLoginPage />;
    };

    if (!isAuthenticated) {
        const routes: Route[] = [
            ...[...(customRoutes || [])],
            {
                path: "/",
                element: renderLoginRouteElement(),
            },
            {
                path: "/login",
                element: renderLoginRouteElement(),
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
                filterRoutes={rankRoutes}
                routes={routes}
            />
        );
    }

    const resourceRoutes: Route[] = [];

    resources.map((resource) => {
        const route: Route = {
            path: `${resource.route}`,
            children: [
                {
                    path: "/",
                    element: (
                        <ResourceComponentWrapper route={`${resource.route}`} />
                    ),
                },
                {
                    path: `:action`,
                    element: (
                        <ResourceComponentWrapper route={`${resource.route}`} />
                    ),
                },
                {
                    path: `:action/:id`,
                    element: (
                        <ResourceComponentWrapper route={`${resource.route}`} />
                    ),
                },
            ],
        };

        resourceRoutes.push(route);
    });

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
                ...[...(resourceRoutes || [])],
                {
                    path: "*",
                    id: "catch-all",
                    element: catchAll ?? <ErrorComponent />,
                },
                {
                    path: "/",
                    id: "index",
                    element: DashboardPage ? (
                        <CanAccess
                            resource="dashboard"
                            action="list"
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <DashboardPage />
                        </CanAccess>
                    ) : (
                        <Navigate
                            to={
                                typeof this !== "undefined" && this.initialRoute
                                    ? this.initialRoute
                                    : `/${resources.find((p) => p.list)?.route}`
                            }
                        />
                    ),
                },
            ],
        },
    ];

    return (
        <Router
            location={locationFromProps ?? location}
            {...rest}
            filterRoutes={rankRoutes}
            routes={routes}
        />
    );
}

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
