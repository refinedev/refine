import {
    useHistory,
    useLocation,
    useParams,
    Prompt,
    Link,
} from "react-router-dom";
import { IRouterProvider } from "@pankod/refine";

import { RouterComponent } from "./routerComponent";

const RouterProvider: IRouterProvider = {
    useHistory,
    useLocation,
    useParams,
    Prompt: Prompt as any,
    Link,
    RouterComponent,
};

export default RouterProvider;
