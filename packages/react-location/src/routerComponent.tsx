import React from "react";
import {
    useAuthenticated,
    useIsAuthenticated,
    useRefineContext,
    useResource,
    useRouterContext,
    LoginPage as DefaultLoginPage,
    LayoutWrapper,
} from "@pankod/refine";
import { rankRoutes } from "react-location-rank-routes";

import {
    Router,
    ReactLocation,
    Route,
    Navigate,
    useRouter,
    RouterProps,
} from "react-location";

import { ResourceComponentWrapper } from "./resourceComponent";

export const location = new ReactLocation();

export const RouterComponent: React.FC<RouterProps> = (props) => {
    const { resources } = useResource();
    const { DashboardPage, LoginPage } = useRefineContext();

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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                location={location}
                routes={routes}
                filterRoutes={rankRoutes}
                {...props}
            />
        );
    }

    const routes: Route[] = [
        ...[...(customRoutes || [])],
        {
            path: "/",
            children: [
                {
                    path: "/",
                    element: DashboardPage ? (
                        <LayoutWrapper>
                            <DashboardPage />
                        </LayoutWrapper>
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

    return (
        <Router
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            location={location}
            routes={routes}
            filterRoutes={rankRoutes}
            {...props}
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
