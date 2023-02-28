import { RouterBindingsContext } from "@contexts/router";
import React, { useContext } from "react";
import { ParseFunction } from "src/interfaces";

export const useParse = () => {
    const bindings = useContext(RouterBindingsContext);

    const useParse = React.useMemo(
        () =>
            bindings?.parse ??
            (() =>
                (() => {
                    return {};
                }) as ParseFunction),
        [bindings?.parse],
    );

    const parse = useParse();

    return parse;
};
