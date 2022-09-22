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

import { RouterProvider } from "./routerProvider";
const { useHistory, useLocation, useParams } = RouterProvider;

type RemixRouteComponentProps = {
    initialData?: any;
};

export function RemixRouteComponent(
    this: { initialRoute?: string },
    {
        children: _children,
        ...rest
    }: PropsWithChildren<RemixRouteComponentProps>,
): React.ReactNode {
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

    useEffect(() => {
        if (pathname === "/" && !DashboardPage) {
            if (typeof this !== "undefined" && this.initialRoute) {
                push(
                    this.initialRoute.startsWith("/")
                        ? this.initialRoute
                        : `/${this.initialRoute}`,
                );
            } else {
                // push(`/${resources.find((p) => p.list)?.route}`);

                /*
                 * the above line is a better solution for the initial route
                 * but in Remix, users can have custom pages through file system
                 * which makes `list` component of the resource redundant.
                 * for these cases, we need to redirect to the first resource
                 * in the resources array, no matter if it has a list component or not.
                 */

                push(`/${resources[0].route}`);
            }
        }
    }, [pathname]);

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
                    >
                        <DashboardPage />
                    </CanAccess>
                </LayoutWrapper>
            );
        } else {
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
}
