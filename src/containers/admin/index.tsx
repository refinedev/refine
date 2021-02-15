import React, { ReactNode, useContext, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "antd/dist/antd.css";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider } from "@contexts/resource";
import { Auth } from "@containers/auth";
import { DashboardPage, LoginPage } from "@pages";
import { IDataContext, IAuthContext } from "@interfaces";
import { ErrorComponent, Layout } from "@components";
import { AuthContext } from "@contexts/auth";

export interface AdminProps {
    authProvider: IAuthContext;
    dataProvider: IDataContext;
    catchAll?: React.ReactNode;
    title?: ReactNode;
}

export const Admin: React.FC<AdminProps> = ({
    authProvider,
    dataProvider,
    title,
    children,
    catchAll,
}) => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    checkAuth({})
        .then(() => setAuthenticated(true))
        .catch(() => setAuthenticated(false));
    console.log(checkAuth().then((val) => console.log("val", val)));

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

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

    const PrivateRoute = ({
        render,
        ...rest
    }: {
        path: string;
        render: any;
        exact?: boolean;
    }) => {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    authenticated ? (
                        render()
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        );
    };

    const RouteWithSubRoutes = (route: any) => {
        return (
            <PrivateRoute
                path={route.path}
                render={(props: any) => (
                    <route.component {...props} routes={route.routes} />
                )}
            />
        );
    };

    const resources: string[] = [];
    React.Children.map(children, (child: any) => {
        RouteHandler(child);
        resources.push(child.props.name);
    });

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

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider {...authProvider}>
                <DataContextProvider {...dataProvider}>
                    <ResourceContextProvider resources={resources}>
                        <Router>
                            {authenticated
                                ? renderAuthorized()
                                : renderUnauthorized()}
                        </Router>
                    </ResourceContextProvider>
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
};
