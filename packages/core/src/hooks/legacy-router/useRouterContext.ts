import { useContext } from "react";
import { RouterContext, defaultProvider } from "@contexts/legacy-router";

export const useRouterContext = () => {
    const routerContextValues = useContext(RouterContext);

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
