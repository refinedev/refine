import React from "react";
import { IRouterProvider } from "@pankod/refine-core";
import {
    useLocation,
    useParams,
    Link,
    RouteProps,
    BrowserRouterProps,
    useNavigate,
} from "react-router-dom";

import { RouterComponent } from "./routerComponent";
import { Prompt } from "./prompt";

interface IReactRouterProvider extends IRouterProvider {
    useLocation: typeof useLocation;
    Link: typeof Link;
    useParams: any;
    routes?: RouteProps[];
    RouterComponent: React.FC<BrowserRouterProps>;
}

const RouterProvider: IReactRouterProvider = {
    useHistory: () => {
        const navigate = useNavigate();

        return {
            push: navigate,
            replace: (path: string) => {
                navigate(path, { replace: true });
            },
            goBack: () => {
                navigate(-1);
            },
        };
    },
    useLocation,
    useParams,
    Prompt: Prompt as any,
    Link,
    RouterComponent,
};
export default RouterProvider;
