import React, { PropsWithChildren, useEffect } from "react";
import { useLoaderData } from "@remix-run/react";

import {
    useRefineContext,
    LayoutWrapper,
    ErrorComponent,
    useResource,
    LoginPage as DefaultLoginPage,
    CanAccess,
} from "@pankod/refine-core";
import type { ResourceRouterParams } from "@pankod/refine-core";
import { useNavigate } from "react-router";

import { RouterProvider } from "./routerProvider";
import { LoaderFunction } from "@remix-run/node";
const { useHistory, useLocation, useParams } = RouterProvider;

type RemixRouteComponentProps = {
    initialData?: any;
};

export const RemixRouteComponent: React.FC<
    PropsWithChildren<RemixRouteComponentProps>
> = ({ children, ...rest }) => {
    const loaderData = useLoaderData();
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

    if (routeResourceName === "login") {
        return LoginPage ? <LoginPage /> : <DefaultLoginPage />;
    }

    if (pathname === "/") {
        if (DashboardPage) {
            return (
                <LayoutWrapper>
                    <CanAccess
                        resource="dashboard"
                        action="list"
                        fallback={catchAll ?? <ErrorComponent />}
                    >
                        <DashboardPage />
                    </CanAccess>
                </LayoutWrapper>
            );
        } else {
            //TODO: redirect to first resource
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
                        >
                            <List
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                initialData={loaderData?.initialData}
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
                        >
                            <Create
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                initialData={loaderData?.initialData}
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
                            params={{ id }}
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <Edit
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                initialData={loaderData?.initialData}
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
                            params={{ id }}
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <Show
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                initialData={loaderData?.initialData}
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

export const loader: LoaderFunction = async ({ params, request, context }) => {
    console.log("____", { params, request, context });
};
