import React from "react";
import { IRouterProvider } from "@pankod/refine";
import {
    useHistory,
    useLocation,
    useParams,
    Prompt,
    Link,
    BrowserRouterProps,
} from "react-router-dom";

import { RouterComponent } from "./routerComponent";

interface IReactRouterProvider extends IRouterProvider {
    useHistory: typeof useHistory;
    useLocation: typeof useLocation;
    Link: typeof Link;
    useParams: typeof useParams;
    RouterComponent: React.FC<BrowserRouterProps>;
}

const RouterProvider: IReactRouterProvider = {
    useHistory,
    useLocation,
    useParams,
    Prompt: Prompt as any,
    Link,
    RouterComponent,
};
export default RouterProvider;
