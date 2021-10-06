import { useContext } from "react";
import { RouterContext } from "@contexts/router";

export const useRouterContext = () => {
    const { useHistory, useLocation, useParams, Prompt, Link } =
        useContext(RouterContext);

    return {
        useHistory,
        useLocation,
        useParams,
        Prompt,
        Link,
    };
};
