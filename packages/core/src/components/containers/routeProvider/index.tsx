/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import {
    LoginPage as DefaultLoginPage,
    ErrorComponent,
    LayoutWrapper,
} from "@components";
import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { OptionalComponent } from "@definitions";
import { IResourceItem } from "@contexts/resource";

export interface RouteProviderProps {
    resources: IResourceItem[];
    catchAll?: React.ReactNode;
    DashboardPage?: React.ElementType;
    LoginPage?: React.FC | false;
    ReadyPage?: React.FC;
    customRoutes: RouteProps[];
}

type IRoutesProps = RouteProps & { routes?: RouteProps[] };

const RouteProviderBase: React.FC<RouteProviderProps> = ({
    resources,
    catchAll,
    DashboardPage,
    LoginPage,
    customRoutes,
}) => {
    const { isAuthenticated, checkAuth, checkError } = useContext<IAuthContext>(
        AuthContext,
    );

    checkAuth().catch(checkError);

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

    const RouteWithSubRoutes = (route: any) => <Route {...route} />;

    const renderAuthorized = () => (
        <LayoutWrapper>
            <Switch>
                <Route
                    path="/"
                    exact
                    component={() =>
                        DashboardPage ? (
                            <DashboardPage />
                        ) : (
                            <Redirect to={`/resources/${resources[0].route}`} />
                        )
                    }
                />
                {[...routes, ...customRoutes].map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}

                <Route path="/resources/:resource?/:action?">
                    {catchAll ?? <ErrorComponent />}
                </Route>
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
                    <OptionalComponent optional={LoginPage}>
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
