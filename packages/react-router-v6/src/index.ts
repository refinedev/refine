import React from "react";
import { handleUseParams, IRouterProvider } from "@pankod/refine-core";
import {
    useLocation,
    useParams,
    RouteProps,
    BrowserRouterProps,
    useNavigate,
    LinkProps,
} from "react-router-dom";

import {
    BrowserRouterComponent,
    MemoryRouterComponent,
    HashRouterComponent,
} from "./routerComponent";
import { Prompt } from "./prompt";
import { WrapperLink } from "./link";

export type RefineRouteProps = RouteProps & {
    layout?: boolean;
};

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
    Partial<Pick<Type, Key>>;

export type WrapperLinkProps =
    | (MakeOptional<LinkProps, "to"> & {
          href: LinkProps["to"];
      })
    | LinkProps;

interface IReactRouterProvider extends IRouterProvider {
    useLocation: typeof useLocation;
    Link: React.FC<WrapperLinkProps>;
    useParams: any;
    RouterComponent: React.FC<BrowserRouterProps>;
    routes?: RefineRouteProps[];
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
    useParams: () => {
        const params = useParams();
        const { pathname } = useLocation();

        const paramsString = `/${Object.values(params).join("/")}`;
        return handleUseParams({
            ...params,
            resource:
                Object.keys(params).length === 0
                    ? pathname.substring(1)
                    : pathname.substring(1).replace(paramsString, ""),
        });
    },
    Prompt: Prompt as any,
    Link: WrapperLink,
    RouterComponent: BrowserRouterComponent,
};
export default RouterProvider;

export { MemoryRouterComponent, HashRouterComponent };
