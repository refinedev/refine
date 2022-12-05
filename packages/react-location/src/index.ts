import { IRouterProvider } from "@pankod/refine-core";
import {
    useLocation,
    Link,
    useNavigate,
    useMatch,
    Route,
    RouterProps,
    ReactLocation,
} from "@tanstack/react-location";

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
            pathname: location?.current.pathname,
            search: location?.current.searchStr,
        };
    },
    useParams: () => {
        const match = useMatch();
        if (!match) {
            return {};
        }

        const pathname = useLocation();

        const paramsString = `/${Object.values(match.params).join("/")}`;

        return handleUseParams({
            ...match.params,
            resource:
                Object.keys(match.params).length === 0
                    ? pathname.current.pathname.substring(1)
                    : decodeURIComponent(
                          pathname.current.pathname.substring(1),
                      ).replace(paramsString, ""),
        });
    },
    Prompt,
    Link,
    RouterComponent,
    location,
};
export default RouterProvider;
