/* eslint-disable react/display-name */
import React from "react";
import { RouteProps, Switch, Route, Redirect } from "react-router-dom";
import {
    LoginPage as DefaultLoginPage,
    ErrorComponent,
    LayoutWrapper,
    useAuthenticated,
    useIsAuthenticated,
    IResourceItem,
    useResource,
    useRefineContext,
    useRouterContext,
    CanAccess,
} from "@pankod/refine";

type IRoutesProps = RouteProps & { routes?: RouteProps[] };

type IRouteComponentProps = { match: { params: { id: string } } };

const RouteProviderBase: React.FC = () => {
    const { resources } = useResource();
    const { catchAll, DashboardPage, LoginPage } = useRefineContext();

    const { routes: customRoutes }: { routes: RouteProps[] } =
        useRouterContext();

    const isAuthenticated = useIsAuthenticated();
    const { isLoading } = useAuthenticated({ type: "routeProvider" });

    if (isLoading) {
        return (
            <Switch>
                <Route />
            </Switch>
        );
    }

    const routes: IRoutesProps[] = [];
    const RouteHandler = (val: IResourceItem): void => {
        const { list, create, edit, show, canDelete, route, name } = val;

        const ListComponent = list;
        const CreateComponent = create;
        const EditComponent = edit;
        const ShowComponent = show;

        const canCreate = !!create;
        const canEdit = !!edit;
        const canShow = !!show;

        if (CreateComponent) {
            routes.push({
                exact: true,
                path: `/:resource(${route})/:action(create)/:id?`,
                component: () => (
                    <CanAccess
                        resource={name}
                        action="create"
                        fallback={catchAll}
                    >
                        <CreateComponent
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                            name={name}
                        />
                    </CanAccess>
                ),
            });
        }

        if (EditComponent) {
            routes.push({
                exact: true,
                path: `/:resource(${route})/:action(edit)/:id`,
                component: (props: IRouteComponentProps) => (
                    <CanAccess
                        resource={name}
                        action="edit"
                        params={{ id: props.match.params.id }}
                        fallback={catchAll}
                    >
                        <EditComponent
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                            name={name}
                        />
                    </CanAccess>
                ),
            });
        }

        if (ShowComponent) {
            routes.push({
                exact: true,
                path: `/:resource(${route})/:action(show)/:id`,
                component: (props: IRouteComponentProps) => (
                    <CanAccess
                        resource={name}
                        action="show"
                        params={{ id: props.match.params.id }}
                        fallback={catchAll}
                    >
                        <ShowComponent
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                            name={name}
                        />
                    </CanAccess>
                ),
            });
        }

        if (ListComponent) {
            routes.push({
                exact: true,
                path: `/:resource(${route})`,
                component: () => (
                    <CanAccess
                        resource={name}
                        action="list"
                        fallback={catchAll}
                    >
                        <ListComponent
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                            name={name}
                        />
                    </CanAccess>
                ),
            });
        }

        return;
    };

    resources.map((item) => {
        RouteHandler(item);
    });

    const RouteWithSubRoutes = (route: any) => <Route {...route} />;

    const renderAuthorized = () => (
        <Switch>
            {[...(customRoutes || [])].map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
            <Route>
                <LayoutWrapper>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() =>
                                DashboardPage ? (
                                    <DashboardPage />
                                ) : (
                                    <Redirect to={`/${resources[0].route}`} />
                                )
                            }
                        />
                        {[...routes].map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                        <Route path="/:resource?/:action?">
                            {catchAll ?? <ErrorComponent />}
                        </Route>
                        <Route>{catchAll ?? <ErrorComponent />}</Route>
                    </Switch>
                </LayoutWrapper>
            </Route>
        </Switch>
    );

    const renderUnauthorized = () => (
        <Switch>
            <Route
                exact
                path={["/", "/login"]}
                component={() =>
                    LoginPage ? <LoginPage /> : <DefaultLoginPage />
                }
            />
            {[...(customRoutes || [])].map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}

            <Route
                render={({ location }: { location: any }) => {
                    if (isLoading) {
                        return null;
                    }

                    const { pathname, search } = location;
                    const toURL = `${pathname}${search}`;

                    return (
                        <Redirect
                            to={`/login?to=${encodeURIComponent(toURL)}`}
                        />
                    );
                }}
            />
        </Switch>
    );
    return isAuthenticated ? renderAuthorized() : renderUnauthorized();
};

/**
 * @internal
 */
export const RouteProvider = React.memo(RouteProviderBase);
