/* eslint-disable react/display-name */
import React, { useContext, useState, ReactNode, ComponentType } from "react";
import {
    Switch,
    Route,
    useLocation,
    RouteProps,
    Redirect,
} from "react-router-dom";
import { Layout, ErrorComponent } from "@components";
import { LoginPage } from "@pages";
import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "@interfaces";

export interface RouteProviderProps {
    title?: ReactNode;
    resources: React.ReactNode;
    catchAll?: React.ReactNode;
    dashboard?: React.ElementType;
    loginPage?: React.ReactNode;
}

type IRoutesProps = RouteProps & { routes?: RouteProps[] };

const RouteProviderBase: React.FC<RouteProviderProps> = ({
    title,
    resources,
    catchAll,
    dashboard,
    loginPage,
}) => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const resourcesArray: string[] = [];

    // TODO Her sayfa değişimi render a sebeb oluyor.
    useLocation();
    checkAuth({})
        .then(() => setAuthenticated(true))
        .catch(() => setAuthenticated(false));

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
                component={() => (loginPage ? <LoginPage /> : <LoginPage />)}
            />
            <Route>{catchAll ?? <ErrorComponent />}</Route>
        </Switch>
    );

    return authenticated ? renderAuthorized() : renderUnauthorized();
};

export const RouteProvider = React.memo(RouteProviderBase);
