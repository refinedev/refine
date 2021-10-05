import React from "react";
import {
    useResource,
    useRefineContext,
    LayoutWrapper,
    LoginPage as DefaultLoginPage,
    ErrorComponent,
} from "@pankod/refine";
import type { ResourceRouterParams } from "@pankod/refine";

import { RouterProvider } from "./routerProvider";

const { useHistory, useLocation, useParams } = RouterProvider;

export const NextRouteComponent: React.FC<{
    isAuthenticated?: boolean;
}> = ({ isAuthenticated }) => {
    const { resources } = useResource();
    const { push } = useHistory();
    const { resource: routeResourceName, action } =
        useParams<ResourceRouterParams>();

    const { pathname } = useLocation();
    const { LoginPage, DashboardPage, catchAll } = useRefineContext();

    const resource = resources.find((res) => res.route === routeResourceName);

    const isServer = typeof window !== "undefined";

    if (isAuthenticated) {
        if (pathname === "/") {
            if (DashboardPage) {
                return <DashboardPage />;
            } else {
                if (isServer) push(`/${resources[0].route}`);
                return null;
            }
        }
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
        return catchAll ? <>{catchAll}</> : <ErrorComponent />;
    }

    if (!isAuthenticated) {
        if (routeResourceName === "login" || pathname === "/") {
            return LoginPage ? <LoginPage /> : <DefaultLoginPage />;
        } else {
            if (isServer) {
                push("/");
            }
            return null;
        }
    }

    return null;
};
