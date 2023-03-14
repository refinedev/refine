import React from "react";
import { IRouterProvider, useAuthenticated } from "@refinedev/core";
import { useHistory } from "./use-history";

export const RouterComponent: NonNullable<
    IRouterProvider["RouterComponent"]
> = ({ children }) => {
    const { replace } = useHistory();
    const { isError, isFetching } = useAuthenticated();

    React.useEffect(() => {
        if (isError && !isFetching) {
            replace("/login");
        }
    }, [isError, isFetching]);

    return children;
};
