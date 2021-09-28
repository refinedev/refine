import { useContext } from "react";
import { RouterContext } from "@contexts/router";

export const useRouterContext = () => {
    const {
        useHistory,
        useLocation,
        useParams,
        Prompt,
        Link,
        Switch,
        Route,
        Redirect,
        BrowserRouter,
    } = useContext(RouterContext);

    return {
        useHistory,
        useLocation,
        useParams,
        Prompt,
        Link,
        Switch,
        Route,
        Redirect,
        BrowserRouter,
    };
};
