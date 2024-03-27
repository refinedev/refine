import { useContext } from "react";

import { LegacyRouterContext, defaultProvider } from "@contexts/router/legacy";

export const useRouterContext = () => {
  const routerContextValues = useContext(LegacyRouterContext);

  const { useHistory, useLocation, useParams, Prompt, Link, routes } =
    routerContextValues ?? defaultProvider;

  return {
    useHistory,
    useLocation,
    useParams,
    Prompt,
    Link,
    routes,
  };
};
