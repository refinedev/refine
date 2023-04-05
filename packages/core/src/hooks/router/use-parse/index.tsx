import { RouterBindingsContext } from "@contexts/router";
import React, { useContext } from "react";
import { ParseFunction, ParseResponse } from "src/interfaces";

type UseParseType = () => <
    TParams extends Record<string, any> = Record<string, any>,
>() => ParseResponse<TParams>;

export const useParse: UseParseType = () => {
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

    return parse as ReturnType<UseParseType>;
};
