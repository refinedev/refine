import React, { useContext } from "react";
import { useResource, useRouterContext } from "@hooks";
import { IRefineContext, ResourceRouterParams } from "src/interfaces";
import {
    LayoutWrapper,
    LoginPage as DefaultLoginPage,
    ErrorComponent,
} from "@components";
import { RefineContext } from "@contexts/refine";

export const NextRouteComponent: React.FC<{
    isAuthenticated?: boolean;
}> = ({ isAuthenticated }) => {
    const { resources } = useResource();
    const { useParams, useLocation, useHistory } = useRouterContext();
    const { push } = useHistory();
    const { resource: routeResourceName, action } =
        useParams<ResourceRouterParams>();

    const { pathname } = useLocation();
    const { customRoutes, LoginPage, DashboardPage, catchAll } =
        useContext<IRefineContext>(RefineContext);

    const resource = resources.find((res) => res.route === routeResourceName);
    const customRoute = customRoutes.find((r) => r.path === routeResourceName);

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
        if (customRoute) {
            const RouteComponent = customRoute
                ? (customRoute.component as any) ??
                  (() => "No component for this custom route found")
                : () => "No custom route found";
            return <RouteComponent />;
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
