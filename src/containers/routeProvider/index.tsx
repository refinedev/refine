/* eslint-disable react/display-name */
import React, { useContext, useState, ReactNode } from "react";
import {
    Switch,
    Route,
    useLocation,
    RouteProps,
    Redirect,
} from "react-router-dom";
import { Layout, ErrorComponent } from "@components";
import { LoginPage as DefaultLoginPage } from "@pages";
import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "@interfaces";
import { OptionalComponent } from "@definitions";

export interface RouteProviderProps {
    title?: ReactNode;
    resources: React.ReactNode;
    catchAll?: React.ReactNode;
    dashboard?: React.ElementType;
    loginPage?: React.FC | false;
}

type IRoutesProps = RouteProps & { routes?: RouteProps[] };

const RouteProviderBase: React.FC<RouteProviderProps> = ({
    title,
    resources,
    catchAll,
    dashboard,
    loginPage,
}) => {
    const { isAuthenticated, checkAuth } = useContext<IAuthContext>(
        AuthContext,
    );

    const resourcesArray: string[] = [];

    checkAuth({});

    const routes: IRoutesProps[] = [];
    const RouteHandler = (val: React.ReactElement): void => {
        const { list, name, create, edit, canDelete } = val.props;

        const ListComponent = list;
        const CreateComponent = create;
        const EditComponent = edit;

        const canCreate = !!create;
        const canEdit = !!edit;
        routes.push(
            {
                exact: true,
                path: `/resources/${name}/create`,
                component: () => (
                    <CreateComponent resourceName={name} canEdit={canEdit} />
                ),
            },
            {
                exact: true,
                path: `/resources/${name}/edit/:id`,
                component: () => <EditComponent resourceName={name} />,
            },
            {
                exact: true,
                path: `/resources/${name}`,
                component: () => (
                    <ListComponent
                        resourceName={name}
                        canCreate={canCreate}
                        canEdit={canEdit}
                        canDelete={canDelete}
                    />
                ),
            },
        );
        return;
    };

    React.Children.map(resources, (child: any) => {
        resourcesArray.push(child.props.name);
        RouteHandler(child);
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
        <Layout title={title}>
            <Switch>
                <Route
                    path="/"
                    exact
                    component={() =>
                        dashboard ? (
                            React.createElement(dashboard, null)
                        ) : (
                            <Redirect to={`/resources/${resourcesArray[0]}`} />
                        )
                    }
                />
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
                <Route>{catchAll ?? <ErrorComponent />}</Route>
            </Switch>
        </Layout>
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
            <Route>{catchAll ?? <ErrorComponent />}</Route>
        </Switch>
    );

    return isAuthenticated ? renderAuthorized() : renderUnauthorized();
};

export const RouteProvider = React.memo(RouteProviderBase);
