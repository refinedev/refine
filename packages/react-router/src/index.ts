import React from "react";
import { handleUseParams, IRouterProvider } from "@pankod/refine-core";
import {
    useHistory,
    useLocation,
    useParams,
    Prompt,
    Link,
    RouteProps,
    BrowserRouterProps,
} from "react-router-dom";

import { RouterComponent } from "./routerComponent";

interface IReactRouterProvider extends IRouterProvider {
    useHistory: typeof useHistory;
    useLocation: typeof useLocation;
    Link: typeof Link;
    useParams: typeof useParams;
    routes?: RouteProps[];
    RouterComponent: React.FC<BrowserRouterProps>;
}

const RouterProvider: IReactRouterProvider = {
    useHistory,
    useLocation,
    useParams: () => {
        const params = useParams();
        return handleUseParams(params);
    },
    Prompt: Prompt as any,
    Link,
    RouterComponent,
};
export default RouterProvider;
