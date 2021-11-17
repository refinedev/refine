import React from "react";
import {
    ErrorComponent,
    LayoutWrapper,
    ResourceRouterParams,
    useAuthenticated,
    useIsAuthenticated,
    useRefineContext,
    useResource,
    useRouterContext,
    LoginPage as DefaultLoginPage,
} from "@pankod/refine";
import { rankRoutes } from "react-location-rank-routes";

import { BrowserRouter, BrowserRouterProps } from "react-router-dom";
import {
    createHashHistory,
    Router,
    ReactLocation,
    Route,
    Navigate,
    useRouter,
} from "react-location";

import { RouteProvider } from "./routeProvider";

const hashHistory = createHashHistory();
const location = new ReactLocation();

export const RouterComponent: React.FC<BrowserRouterProps> = ({
    children,
    ...props
}) => {
    /*     const { setWarnWhen } = useWarnAboutChange();

    const getUserConfirmation: (
        message: string,
        callback: (ok: boolean) => void,
    ) => void = (message, callback) => {
        const allowTransition = window.confirm(message);
        if (allowTransition) {
            setWarnWhen(false);
        }
        callback(allowTransition);
    }; */

    const { resources } = useResource();
    const { catchAll, DashboardPage, LoginPage } = useRefineContext();

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
                element: <LoginWithNavigate />,
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

    console.log("customRoutes", customRoutes, routes);

    return (
        <Router location={location} routes={routes} filterRoutes={rankRoutes} />
    );
};

export const ResourceComponentWrapper: React.FC = () => {
    const { catchAll } = useRefineContext();
    const { useParams } = useRouterContext();
    const { resources } = useResource();

    const { resource: routeResourceName, action } =
        useParams<ResourceRouterParams>();

    const resource = resources.find((res) => res.route === routeResourceName);

    if (resource) {
        const {
            list,
            create,
            edit,
            show,
            name,
            canCreate,
            canEdit,
            canShow,
            canDelete,
        } = resource;

        const List = list ?? (() => null);
        const Create = create ?? (() => null);
        const Edit = edit ?? (() => null);
        const Show = show ?? (() => null);

        const renderCrud = () => {
            switch (action) {
                case undefined: {
                    return (
                        <List
                            name={name}
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                        />
                    );
                }

                case "create": {
                    return (
                        <Create
                            name={name}
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                        />
                    );
                }

                case "edit": {
                    return (
                        <Edit
                            name={name}
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                        />
                    );
                }

                case "show": {
                    return (
                        <Show
                            name={name}
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                        />
                    );
                }
            }
        };

        return <LayoutWrapper>{renderCrud()}</LayoutWrapper>;
    }

    return catchAll ? (
        <>{catchAll}</>
    ) : (
        <LayoutWrapper>
            <ErrorComponent />
        </LayoutWrapper>
    );
};

export const LoginWithNavigate: React.FC = () => {
    const { state } = useRouter();
    console.log("location", location);

    return (
        <Navigate
            to={`/login`}
            search={{
                to: `${state.location.href}`,
            }}
        />
    );
};
