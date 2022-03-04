import { IRouterProvider } from "@pankod/refine-core";
import {
    useLocation,
    Link,
    useNavigate,
    useMatch,
    Route,
    RouterProps,
    ReactLocation,
} from "react-location";

import { RouterComponent, location } from "./routerComponent";
import { Prompt } from "./prompt";
import { handleUseParams } from "@pankod/refine-core";

export type RefineRouteProps = Route & {
    layout?: boolean;
};

interface IReactRouterProvider extends IRouterProvider {
    routes?: RefineRouteProps[];
    RouterComponent: React.FC<RouterProps>;
    Link: typeof Link;
    location: ReactLocation;
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
        return {
            pathname: location.current.pathname,
            search: location.current.searchStr,
        };
    },
    useParams: () => {
        const { params } = useMatch();
        return handleUseParams(params);
    },
    Prompt,
    Link,
    RouterComponent,
    location,
};
export default RouterProvider;
