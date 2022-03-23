/* eslint-disable react/display-name */
import React from "react";
import { RouteProps, Route, Routes, Navigate, Outlet } from "react-router-dom";
import {
    LoginPage as DefaultLoginPage,
    ErrorComponent,
    LayoutWrapper,
    useAuthenticated,
    useIsAuthenticated,
    useResource,
    useRefineContext,
    useRouterContext,
    CanAccess,
    ResourceRouterParams,
    createTreeView,
    ITreeMenu,
    IResourceItem,
} from "@pankod/refine-core";
import { RefineRouteProps } from "./index";

const ResourceComponent: React.FC<{ route: string }> = ({ route }) => {
    const { catchAll } = useRefineContext();
    const { useParams } = useRouterContext();
    const { resources } = useResource();

    const {
        resource: routeName,
        action,
        id,
    } = useParams<ResourceRouterParams>();

    console.log("route", route);
    console.log("routeName", routeName);

    const resource = resources.find((res) => res.route === route);

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

        const List = list ?? (() => null);
        const Create = create ?? (() => null);
        const Edit = edit ?? (() => null);
        const Show = show ?? (() => null);

        const renderCrud = () => {
            switch (action) {
                case undefined:
                default:
                    return (
                        <CanAccess
                            resource={name}
                            action="list"
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <List
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                options={options}
                            />
                        </CanAccess>
                    );
                case "create":
                case "clone":
                    return (
                        <CanAccess
                            resource={name}
                            action="create"
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <Create
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                options={options}
                            />
                        </CanAccess>
                    );

                case "edit":
                    return (
                        <CanAccess
                            resource={name}
                            action="edit"
                            params={{ id }}
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <Edit
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                options={options}
                            />
                        </CanAccess>
                    );

                case "show":
                    return (
                        <CanAccess
                            resource={name}
                            action="show"
                            params={{ id }}
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <Show
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                options={options}
                            />
                        </CanAccess>
                    );
            }
        };

        return renderCrud();
    }

    return <>{catchAll ?? <ErrorComponent />}</>;
};

export const RouteProvider = () => {
    const { resources } = useResource();
    const { catchAll, DashboardPage, LoginPage } = useRefineContext();

    const treeMenu: ITreeMenu[] = createTreeView(resources);

    const { routes: customRoutes }: { routes: RouteProps[] } =
        useRouterContext();

    const isAuthenticated = useIsAuthenticated();
    const { isLoading } = useAuthenticated({ type: "routeProvider" });

    if (isLoading) {
        return (
            <Routes>
                <Route path="*" element={null} />
            </Routes>
        );
    }

    const CustomPathAfterLogin: React.FC = (): JSX.Element | null => {
        const { pathname, search } = location;
        const toURL = `${pathname}${search}`;

        return <Navigate to={`/login?to=${encodeURIComponent(toURL)}`} />;
    };

    console.log("resources", resources);

    // const renderTreeView = (item: ITreeMenu[]) => {
    //     return item.map((p: ITreeMenu) => {
    //         if (p.children.length > 0) {
    //             return (
    //                 <Route path={p.name}>{renderTreeView(p.children)}</Route>
    //             );
    //         } else {
    //             return (
    //                 <Route
    //                     path=":resource"
    //                     element={<ResourceComponent route={p.route!} />}
    //                 >
    //                     <Route
    //                         path=":action"
    //                         element={<ResourceComponent route={p.route!} />}
    //                     >
    //                         <Route
    //                             path=":id"
    //                             element={<ResourceComponent route={p.route!} />}
    //                         />
    //                     </Route>
    //                 </Route>
    //             );
    //         }
    //     });
    // };

    const routesAll = resources.map((route: IResourceItem) => {
        return (
            <Route
                key={`${route.route}`}
                path={route.route}
                element={
                    <ResourceComponent route={route.route!}>
                        <Outlet />
                    </ResourceComponent>
                }
            >
                <Route
                    path=":action"
                    element={
                        <ResourceComponent route={route.route!}>
                            <Outlet />
                        </ResourceComponent>
                    }
                >
                    <Route
                        path=":id"
                        element={<ResourceComponent route={route.route!} />}
                    />
                </Route>
            </Route>
        );
    });
    console.log("routesAll", [...(routesAll || [])]);

    const renderAuthorized = () => (
        <Routes>
            {[...(customRoutes || [])]
                .filter((p: RefineRouteProps) => !p.layout)
                .map((route, i) => (
                    <Route
                        key={`custom-route-${i}`}
                        {...route}
                        element={route.element}
                    />
                ))}
            <Route
                path="/"
                element={
                    <LayoutWrapper>
                        <Outlet />
                    </LayoutWrapper>
                }
            >
                {[...(customRoutes || [])]
                    .filter((p: RefineRouteProps) => p.layout)
                    .map((route, i) => (
                        <Route
                            key={`custom-route-${i}`}
                            {...route}
                            element={route.element}
                        />
                    ))}
                <Route
                    index
                    element={
                        DashboardPage ? (
                            <CanAccess
                                resource="dashboard"
                                action="list"
                                fallback={catchAll ?? <ErrorComponent />}
                            >
                                <DashboardPage />
                            </CanAccess>
                        ) : (
                            <Navigate to={`/${resources[0].route}`} />
                        )
                    }
                />
                {/* {...routesAll} */}
                {[...(routesAll || [])]}
            </Route>
        </Routes>
    );

    const renderUnauthorized = () => (
        <Routes>
            {[...(customRoutes || [])].map((route, i) => (
                <Route key={`custom-route-${i}`} {...route} />
            ))}
            <Route
                path="/"
                element={LoginPage ? <LoginPage /> : <DefaultLoginPage />}
            />
            <Route
                path="/login"
                element={LoginPage ? <LoginPage /> : <DefaultLoginPage />}
            />
            <Route path="*" element={<CustomPathAfterLogin />} />
        </Routes>
    );
    return isAuthenticated ? renderAuthorized() : renderUnauthorized();
};
