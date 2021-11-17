import React from "react";
import {
    LayoutWrapper,
    useAuthenticated,
    useIsAuthenticated,
    useRefineContext,
    useResource,
    useRouterContext,
    useWarnAboutChange,
} from "@pankod/refine";
import { BrowserRouter, BrowserRouterProps } from "react-router-dom";
import {
    createHashHistory,
    Router,
    ReactLocation,
    Route,
} from "react-location";

import { RouteProvider } from "./routeProvider";

const hashHistory = createHashHistory();
const location = new ReactLocation();

export const RouterComponent: React.FC<BrowserRouterProps> = ({
    children,
    ...props
}) => {
    /*     const { setWarnWhen } = useWarnAboutChange();

    const getUserConfirmation: (
        message: string,
        callback: (ok: boolean) => void,
    ) => void = (message, callback) => {
        const allowTransition = window.confirm(message);
        if (allowTransition) {
            setWarnWhen(false);
        }
        callback(allowTransition);
    }; */

    const { resources } = useResource();
    const { catchAll, DashboardPage, LoginPage } = useRefineContext();

    const { routes: customRoutes }: { routes: any[] } = useRouterContext();

    const isAuthenticated = useIsAuthenticated();
    const { isLoading } = useAuthenticated({ type: "routeProvider" });

    if (isLoading) {
        return null;
    }

    const routes: any[] = [];
    resources.map((item) => {
        const { list, create, edit, show, canDelete, route, name } = item;

        const ListComponent = list;
        const CreateComponent = create;
        const EditComponent = edit;
        const ShowComponent = show;

        const canCreate = !!create;
        const canEdit = !!edit;
        const canShow = !!show;

        /*  if (CreateComponent) {
            routes.push({
                path: `/:resource(${route})/:action(create)`,
                element: (
                    <LayoutWrapper>
                        <CreateComponent
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                            name={name}
                        />
                    </LayoutWrapper>
                ),
            });
        }

        if (EditComponent) {
            routes.push({
                path: `/:resource(${route})/:action(edit)/:id`,
                element: (
                    <LayoutWrapper>
                        <EditComponent
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                            name={name}
                        />
                    </LayoutWrapper>
                ),
            });
        }

        if (ShowComponent) {
            routes.push({
                path: `/:resource(${route})/:action(show)/:id`,
                element: (
                    <LayoutWrapper>
                        <ShowComponent
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                            name={name}
                        />
                    </LayoutWrapper>
                ),
            });
        } */

        if (ListComponent) {
            routes.push({
                path: `:resource`,
                children: [
                    {
                        children: [
                            {
                                path: ":action",
                                element: <div>action</div>,
                                children: [
                                    {
                                        path: "/create",
                                        element: <div>create</div>,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        }

        return;
    });

    return (
        <Router
            location={location}
            routes={routes}
            /* {...props} */
            /* getUserConfirmation={getUserConfirmation} */
        />
    );
};
