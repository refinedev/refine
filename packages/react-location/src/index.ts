import React from "react";
import { handleUseParams } from "@pankod/refine-core";
import { IRouterProvider } from "@pankod/refine-core";
import {
    useLocation,
    useNavigate,
    useMatch,
    Route,
    RouterProps,
    ReactLocation,
    LinkProps,
} from "react-location";

import { RouterComponent, location } from "./routerComponent";
import { Prompt } from "./prompt";
import { WrapperLink } from "./link";

export type RefineRouteProps = Route & {
    layout?: boolean;
};

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
    Partial<Pick<Type, Key>>;

export interface WrapperLinkProps extends MakeOptional<LinkProps, "to"> {
    href: LinkProps["to"];
}

interface IReactRouterProvider extends IRouterProvider {
    routes?: RefineRouteProps[];
    RouterComponent: React.FC<RouterProps>;
    Link: React.FC<WrapperLinkProps>;
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
                    : pathname.current.pathname
                          .substring(1)
                          .replace(paramsString, ""),
        });
    },
    Prompt,
    Link: WrapperLink,
    RouterComponent,
    location,
};
export default RouterProvider;
