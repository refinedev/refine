import React from "react";
import {
    useRefineContext,
    LayoutWrapper,
    ErrorComponent,
    useResource,
    LoginPage as DefaultLoginPage,
    CanAccess,
    useRouterContext,
} from "@refinedev/core";
import type { ResourceRouterParams } from "@refinedev/core";

export function NextRouteComponent(
    this: { initialRoute?: string },
    props: any,
): React.ReactNode {
    const { useHistory, useLocation, useParams } = useRouterContext();
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
                        <DashboardPage {...props} />
                    </CanAccess>
                </LayoutWrapper>
            );
        } else {
            if (isServer) {
                if (typeof this !== "undefined" && this.initialRoute) {
                    push(this.initialRoute);
                } else {
                    // push(`${resources.find((el) => el.list).route}`);

                    /*
                     * the above line is a better solution for the initial route
                     * but in next.js, users can have custom pages through file system
                     * which makes `list` component of the resource redundant.
                     * for these cases, we need to redirect to the first resource
                     * in the resources array, no matter if it has a list component or not.
                     */

                    push(`/${resources[0].route?.replace(/^\//, "")}`);
                }
            }
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

        const stringError = () =>
            console.error(
                `\`string\` resource routes are not supported in legacy router. Please switch to the new router or assign Components to the resource routes.`,
            );
        const definitionError = () =>
            console.error(
                `\`Object\` resource routes are not supported in legacy router. Please switch to the new router or assign Components to the resource routes.`,
            );

        const List =
            (typeof list === "string"
                ? stringError()
                : typeof list === "object"
                ? definitionError()
                : list) ?? (() => null);
        const Create =
            (typeof create === "string"
                ? stringError()
                : typeof create === "object"
                ? definitionError()
                : create) ?? (() => null);
        const Edit =
            (typeof edit === "string"
                ? stringError()
                : typeof edit === "object"
                ? definitionError()
                : edit) ?? (() => null);
        const Show =
            (typeof show === "string"
                ? stringError()
                : typeof show === "object"
                ? definitionError()
                : show) ?? (() => null);

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
                                options={options}
                                {...props}
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
                                options={options}
                                {...props}
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
                                options={options}
                                {...props}
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
                                options={options}
                                {...props}
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
