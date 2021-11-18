import React from "react";
import {
    useAuthenticated,
    useIsAuthenticated,
    useRefineContext,
    useResource,
    useRouterContext,
    LoginPage as DefaultLoginPage,
} from "@pankod/refine";
import { rankRoutes } from "react-location-rank-routes";

import {
    Router,
    ReactLocation,
    Route,
    Navigate,
    useRouter,
} from "react-location";

import { ResourceComponentWrapper } from "./resourceComponent";

const location = new ReactLocation();

export const RouterComponent: React.FC = () => {
    const { resources } = useResource();
    const { DashboardPage, LoginPage } = useRefineContext();

    const { routes: customRoutes }: { routes: Route[] } = useRouterContext();

    const isAuthenticated = useIsAuthenticated();
    const { isLoading } = useAuthenticated({ type: "routeProvider" });

    if (isLoading) {
        return null;
    }

    let routes: Route[] = [];

    if (!isAuthenticated) {
        routes = [
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
    }

    if (isAuthenticated) {
        routes = [
            ...[...(customRoutes || [])],
            {
                path: "/",
                children: [
                    {
                        path: "/",
                        element: DashboardPage ? (
                            <DashboardPage />
                        ) : (
                            <Navigate to={`/${resources[0].route}`} />
                        ),
                    },
                ],
            },
            {
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
                        element: <ResourceComponentWrapper />,
                    },
                ],
            },
        ];
    }

    return (
        <Router location={location} routes={routes} filterRoutes={rankRoutes} />
    );
};

export const LoginNavigateWithToParam: React.FC = () => {
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
