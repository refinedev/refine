import React from "react";
import {
    useRefineContext,
    LayoutWrapper,
    ErrorComponent,
    useResource,
    LoginPage as DefaultLoginPage,
    useAuthenticated,
} from "@pankod/refine";
import type { ResourceRouterParams } from "@pankod/refine";

import { RouterProvider } from "./routerProvider";

const { useHistory, useLocation, useParams } = RouterProvider;

type NextRouteComponentProps = {
    pageData?: {
        list?: any;
        create?: any;
        edit?: any;
        show?: any;
    };
};

export const NextRouteComponent: React.FC<NextRouteComponentProps> = ({
    pageData,
}) => {
    const { resources } = useResource();
    const { push } = useHistory();
    const { resource: routeResourceName, action } =
        useParams<ResourceRouterParams>();

    const { isLoading } = useAuthenticated({ type: "routeProvider" });

    if (isLoading) {
        return null;
    }

    const { pathname } = useLocation();
    const { DashboardPage, catchAll, LoginPage } = useRefineContext();

    const resource = resources.find((res) => res.route === routeResourceName);

    const isServer = typeof window !== "undefined";

    if (routeResourceName === "login") {
        return LoginPage ? <LoginPage /> : <DefaultLoginPage />;
    }

    if (pathname === "/") {
        if (DashboardPage) {
            return (
                <LayoutWrapper>
                    <DashboardPage />
                </LayoutWrapper>
            );
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
                            initialData={pageData?.list}
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
                            initialData={pageData?.create}
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
                            initialData={pageData?.edit}
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
                            initialData={pageData?.show}
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
