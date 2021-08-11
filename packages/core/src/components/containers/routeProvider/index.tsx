/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import { useQuery } from "react-query";

import {
    LoginPage as DefaultLoginPage,
    ErrorComponent,
    LayoutWrapper,
} from "@components";
import { AuthContext } from "@contexts/auth";
import { IAuthContext, IResourceItem } from "../../../interfaces";

export interface RouteProviderProps {
    resources: IResourceItem[];
    catchAll?: React.ReactNode;
    DashboardPage?: React.ElementType;
    LoginPage?: React.FC | false;
    ReadyPage?: React.FC;
    customRoutes?: RouteProps[];
}

type IRoutesProps = RouteProps & { routes?: RouteProps[] };

const RouteProviderBase: React.FC<RouteProviderProps> = ({
    resources,
    catchAll,
    DashboardPage,
    LoginPage,
    customRoutes = [],
}) => {
    const { checkAuth, isAuthenticated } =
        useContext<IAuthContext>(AuthContext);

    const { isLoading } = useQuery(
        ["useAuthenticated", { type: "routeProvider" }],
        checkAuth,
        {
            retry: false,
        },
    );

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
                    <CreateComponent
                        canCreate={canCreate}
                        canEdit={canEdit}
                        canDelete={canDelete}
                        canShow={canShow}
                        name={name}
                    />
                ),
            });
        }

        if (EditComponent) {
            routes.push({
                exact: true,
                path: `/:resource(${route})/:action(edit)/:id`,
                component: () => (
                    <EditComponent
                        canCreate={canCreate}
                        canEdit={canEdit}
                        canDelete={canDelete}
                        canShow={canShow}
                        name={name}
                    />
                ),
            });
        }

        if (ShowComponent) {
            routes.push({
                exact: true,
                path: `/:resource(${route})/:action(show)/:id`,
                component: () => (
                    <ShowComponent
                        canCreate={canCreate}
                        canEdit={canEdit}
                        canDelete={canDelete}
                        canShow={canShow}
                        name={name}
                    />
                ),
            });
        }

        if (ListComponent) {
            routes.push({
                exact: true,
                path: `/:resource(${route})`,
                component: () => (
                    <ListComponent
                        canCreate={canCreate}
                        canEdit={canEdit}
                        canDelete={canDelete}
                        canShow={canShow}
                        name={name}
                    />
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
            {[...customRoutes].map((route, i) => (
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
            {customRoutes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}

            <Route
                render={({ location }) => {
                    if (isLoading) {
                        return null;
                    }

                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location },
                            }}
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
