import React, {
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import {
    Switch,
    Route,
    useLocation,
} from "react-router-dom";
import { Layout, ErrorComponent } from "@components";
import { DashboardPage, LoginPage } from "@pages";
import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "@interfaces";

export interface RouteProviderProps {
    title?: ReactNode;
    resources: React.ReactNode;
    catchAll?: React.ReactNode;
}

export const RouteProvider: React.FC<RouteProviderProps> = ({
    title,
    resources,
    catchAll,
}) => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        checkAuth({})
            .then(() => setAuthenticated(true))
            .catch(() => setAuthenticated(false));
    }, [location]);

    console.log("authendicated", authenticated);

    const routes: any[] = [];
    const RouteHandler = (val: any) => {
        const { list, name, create, edit, canDelete } = val.props;

        const ListComponent = list;
        const CreateComponent = create;
        const EditComponent = edit;

        const canCreate = !!create;
        const canEdit = !!edit;

        routes.push(
            {
                path: "/",
                exact: true,
                component: () => <DashboardPage />,
            },
            {
                path: `/resources/${name}`,
                component: () => (
                    <ListComponent
                        resourceName={name}
                        canCreate={canCreate}
                        canEdit={canEdit}
                        canDelete={canDelete}
                    />
                ),
                routes: [
                    {
                        path: `/resources/${name}/create`,
                        component: () => (
                            <CreateComponent
                                resourceName={name}
                                canEdit={canEdit}
                            />
                        ),
                    },
                    {
                        path: `/resources/${name}/edit/:id`,
                        component: () => <EditComponent resourceName={name} />,
                    },
                ],
            },
        );
        return;
    };

    React.Children.map(resources, (child: any) => {
        RouteHandler(child);
    });

    const RouteWithSubRoutes = (route: any) => {
        return (
            <Route
                path={route.path}
                render={(props: any) => (
                    <route.component {...props} routes={route.routes} />
                )}
            />
        );
    };

    const renderAuthorized = () => (
        <Layout title={title}>
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
                <Route>{catchAll ?? <ErrorComponent />}</Route>
            </Switch>
        </Layout>
    );

    const renderUnauthorized = () => (
        <Switch>
            <Route exact path="/login">
                <LoginPage />
            </Route>
            <Route>{catchAll ?? <ErrorComponent />}</Route>
        </Switch>
    );

    return authenticated ? renderAuthorized() : renderUnauthorized();
};
