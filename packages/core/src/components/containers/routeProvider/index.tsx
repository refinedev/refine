/* eslint-disable react/display-name */
import React, { useContext, ReactNode } from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import { LayoutWrapper, ErrorComponent } from "@components";
import { LoginPage as DefaultLoginPage } from "@components";
import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { OptionalComponent } from "@definitions";
import { IResourceItem } from "@contexts/resource";

export interface RouteProviderProps {
    resources: IResourceItem[];
    catchAll?: React.ReactNode;
    dashboardPage?: React.ElementType;
    loginPage?: React.FC | false;
    ready?: React.FC;
    customRoutes: RouteProps[];
}

type IRoutesProps = RouteProps & { routes?: RouteProps[] };

const RouteProviderBase: React.FC<RouteProviderProps> = ({
    resources,
    catchAll,
    dashboardPage,
    loginPage,
    customRoutes,
}) => {
    const { isAuthenticated, checkAuth } = useContext<IAuthContext>(
        AuthContext,
    );

    checkAuth({});

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
                path: `/resources/:resource(${route})/:action(create)/:id?`,
                component: () => {
                    return (
                        <CreateComponent
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                            name={name}
                        />
                    );
                },
            });
        }

        if (EditComponent) {
            routes.push({
                exact: true,
                path: `/resources/:resource(${route})/:action(edit)/:id`,
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
                path: `/resources/:resource(${route})/:action(show)/:id`,
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
                path: `/resources/:resource(${route})`,
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

    const RouteWithSubRoutes = (route: any) => {
        return (
            <Route
                exact
                path={route.path}
                render={(props) => <route.component {...props} />}
            />
        );
    };

    const renderAuthorized = () => (
        <LayoutWrapper>
            <Switch>
                <Route
                    path="/"
                    exact
                    component={() =>
                        dashboardPage ? (
                            React.createElement(dashboardPage, null)
                        ) : (
                            <Redirect to={`/resources/${resources[0].route}`} />
                        )
                    }
                />
                {[...routes, ...customRoutes].map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
                <Route>{catchAll ?? <ErrorComponent />}</Route>
            </Switch>
        </LayoutWrapper>
    );

    const renderUnauthorized = () => (
        <Switch>
            <Route
                exact
                path={["/", "/login"]}
                component={() => (
                    <OptionalComponent optional={loginPage}>
                        <DefaultLoginPage />
                    </OptionalComponent>
                )}
            />
            {customRoutes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
            <Route>{catchAll ?? <ErrorComponent />}</Route>
        </Switch>
    );

    return isAuthenticated ? renderAuthorized() : renderUnauthorized();
};

export const RouteProvider = React.memo(RouteProviderBase);
