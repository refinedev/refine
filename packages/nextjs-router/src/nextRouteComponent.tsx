import React, { ReactNode } from "react";
import {
    useRefineContext,
    LayoutWrapper,
    ErrorComponent,
    useResource,
    LoginPage as DefaultLoginPage,
    CanAccess,
} from "@pankod/refine-core";
import type { ResourceRouterParams } from "@pankod/refine-core";

import { RouterProvider } from "./routerProvider";

const { useHistory, useLocation, useParams } = RouterProvider;

type NextRouteComponentProps = {
    initialData?: any;
    children: ReactNode;
};

export const NextRouteComponent: React.FC<NextRouteComponentProps> = ({
    initialData,
    children,
    ...rest
}) => {
    const { resources } = useResource();
    const { push } = useHistory();
    const {
        resource: routeResourceName,
        action,
        id,
    } = useParams<ResourceRouterParams>();

    const { pathname } = useLocation();
    const { DashboardPage, catchAll, LoginPage } = useRefineContext();

    const resource = resources.find(
        (res) =>
            res.name === routeResourceName || res.route === routeResourceName,
    );

    const isServer = typeof window !== "undefined";

    const renderLoginRouteElement = (): JSX.Element => {
        if (LoginPage) return <LoginPage />;
        return <DefaultLoginPage />;
    };

    if (routeResourceName === "login") {
        return renderLoginRouteElement();
    }

    if (pathname === "/") {
        if (DashboardPage) {
            return (
                <LayoutWrapper>
                    <CanAccess
                        resource="dashboard"
                        action="list"
                        fallback={catchAll ?? <ErrorComponent />}
                        params={{
                            resource,
                        }}
                    >
                        <DashboardPage />
                    </CanAccess>
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
            options,
        } = resource;

        const List = list ?? (() => null);
        const Create = create ?? (() => null);
        const Edit = edit ?? (() => null);
        const Show = show ?? (() => null);

        const renderCrud = () => {
            switch (action) {
                case undefined: {
                    return (
                        <CanAccess
                            resource={name}
                            action="list"
                            fallback={catchAll ?? <ErrorComponent />}
                            params={{
                                resource,
                            }}
                        >
                            <List
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                initialData={initialData}
                                options={options}
                                {...rest}
                            />
                        </CanAccess>
                    );
                }

                case "create":
                case "clone": {
                    return (
                        <CanAccess
                            resource={name}
                            action="create"
                            fallback={catchAll ?? <ErrorComponent />}
                            params={{
                                resource,
                            }}
                        >
                            <Create
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                initialData={initialData}
                                options={options}
                                {...rest}
                            />
                        </CanAccess>
                    );
                }

                case "edit": {
                    return (
                        <CanAccess
                            resource={name}
                            action="edit"
                            params={{ id, resource }}
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <Edit
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                initialData={initialData}
                                options={options}
                                {...rest}
                            />
                        </CanAccess>
                    );
                }

                case "show": {
                    return (
                        <CanAccess
                            resource={name}
                            action="show"
                            params={{ id, resource }}
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <Show
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                initialData={initialData}
                                options={options}
                                {...rest}
                            />
                        </CanAccess>
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
