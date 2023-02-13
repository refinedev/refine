import { RouterBindingsContext } from "@contexts/router";
import React, { useContext } from "react";
import warnOnce from "warn-once";

export const useGo = () => {
    const bindings = useContext(RouterBindingsContext);

    const useGo = React.useMemo(
        () =>
            bindings?.go ??
            (() => () => {
                warnOnce(
                    !bindings?.go,
                    "`go` is not defined in router bindings. Please check your `<Refine>` component.",
                );
            }),
        [bindings?.go],
    );

    const go = useGo();

    return go;
};
