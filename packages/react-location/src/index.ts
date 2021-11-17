import { IRouterProvider } from "@pankod/refine";
import {
    useLocation,
    Prompt,
    Link,
    useNavigate,
    useMatch,
    Route,
} from "react-location";

import { RouterComponent } from "./routerComponent";

interface IReactRouterProvider extends IRouterProvider {
    routes?: Route[];
}

const RouterProvider: IReactRouterProvider = {
    useHistory: () => {
        const navigate = useNavigate();
        const location = useLocation();

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
                location.history.back();
            },
        };
    },
    useLocation: () => {
        const location = useLocation();
        console.log("useLocation", {
            search: location,
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
