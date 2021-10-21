import {
    useHistory,
    useLocation,
    useParams,
    Prompt,
    Link,
} from "react-router-dom";

import { IRouterProvider } from "@pankod/refine";

import { RouterComponent } from "./routerComponent";

interface IReactRouterProvider extends IRouterProvider {
    useHistory: typeof useHistory;
    useLocation: typeof useLocation;
    Link: typeof Link;
    useParams: typeof useParams;
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
