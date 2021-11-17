import React from "react";
import { IRouterProvider } from "@pankod/refine";
import {
    useLocation,
    Prompt,
    Link,
    useNavigate,
    useSearch,
    useMatch,
} from "react-location";

import { RouterComponent } from "./routerComponent";

/* interface IReactRouterProvider extends IRouterProvider {
    useHistory: typeof useHistory;
    useLocation:;
    Link: typeof Link;
    useParams: typeof useParams;
    routes?: RouteProps[];
    RouterComponent: React.FC<BrowserRouterProps>;
}
 */
const RouterProvider: IRouterProvider = {
    useHistory: () => {
        const navigate = useNavigate();

        return {
            push: (path: string) => {
                navigate({
                    to: path,
                });
            },
            replace: (path: string) => {
                navigate({
                    to: path,
                    replace: true,
                });
            },
            goBack: () => {
                return false;
            },
        };
    },
    useLocation: () => {
        const location = useLocation();
        console.log("useLocation", {
            pathname: location.current.pathname,
            search: location.current.searchStr,
        });
        return {
            pathname: location.current.pathname,
            search: location.current.searchStr,
        };
    },
    useParams: <Params>() => {
        const match = useMatch();

        const params = match.params;

        console.log("params", params);
        return params as any;
    },
    Prompt: Prompt as any,
    Link,
    RouterComponent,
};
export default RouterProvider;
