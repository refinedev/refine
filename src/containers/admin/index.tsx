import React, { ReactNode , useContext} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "antd/dist/antd.css";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider } from "@contexts/resource";
import { Auth } from "@containers/auth";
import { DashboardPage, LoginPage } from "@pages";
import { IDataContext, IAuthContext } from "@interfaces";
import { ErrorComponent } from "@components";



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

        console.log("route lst", list);

        routes.push({
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
        });
    };
 

    const resources: string[] = [];
    React.Children.map(children, (child: any) => {
        RouteHandler(child);
        resources.push(child.props.name);
    });

    const RouteWithSubRoutes = (route: any) => {
        return (
            <Route
                path={route.path}
                render={(props) => (
                    <route.component {...props} routes={route.routes} />
                )}
            />
        );
    };
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider {...authProvider}>
                <DataContextProvider {...dataProvider}>
                    <ResourceContextProvider resources={resources}>
                        <Router>
                            <Switch>
                                <Route exact path="/login">
                                    <LoginPage />
                                </Route>
                                    <Route exact path="/">
                                        <DashboardPage />
                                    </Route>

                                    {routes.map((route, i) => (
                                        <RouteWithSubRoutes
                                            key={i}
                                            {...route}
                                        />
                                    ))}

                                    <Route>
                                        {catchAll ?? <ErrorComponent />}
                                    </Route>
                            </Switch>
                        </Router>
                    </ResourceContextProvider>
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
};
