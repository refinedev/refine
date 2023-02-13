import { RouterBindingsContext } from "@contexts/router";
import React, { useContext } from "react";
import { ParseFunction } from "src/interfaces";
import warnOnce from "warn-once";

export const useParse = () => {
    const bindings = useContext(RouterBindingsContext);

    const useParse = React.useMemo(
        () =>
            bindings?.parse ??
            (() =>
                (() => {
                    warnOnce(
                        !bindings?.go,
                        "`parse` is not defined in router bindings. Please check your `<Refine>` component.",
                    );
                    return {};
                }) as ParseFunction),
        [bindings?.parse],
    );

    const parse = useParse();

    return parse;
};
