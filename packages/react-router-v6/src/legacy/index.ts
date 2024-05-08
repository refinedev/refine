import React from "react";
import { handleUseParams, IRouterProvider } from "@refinedev/core";
import {
  useLocation,
  useParams,
  Link,
  RouteProps,
  BrowserRouterProps,
  useNavigate,
} from "react-router-dom";

import {
  BrowserRouterComponent,
  MemoryRouterComponent,
  HashRouterComponent,
} from "./routerComponent.js";
import { Prompt } from "./prompt.js";

export type RefineRouteProps = RouteProps & {
  layout?: boolean;
};
interface IReactRouterProvider extends IRouterProvider {
  useLocation: typeof useLocation;
  Link: typeof Link;
  useParams: <Params extends { [K in keyof Params]?: string } = {}>() => Params;
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
          : decodeURIComponent(pathname.substring(1)).replace(paramsString, ""),
    });
  },
  Prompt: Prompt as any,
  Link,
  RouterComponent: BrowserRouterComponent,
};

// External dependencies are no longer exported
// export * from "react-router-dom";

export default RouterProvider;
export { MemoryRouterComponent, HashRouterComponent, BrowserRouterComponent };
