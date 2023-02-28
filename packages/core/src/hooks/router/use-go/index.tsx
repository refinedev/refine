import { RouterBindingsContext } from "@contexts/router";
import React, { useContext } from "react";

export const useGo = () => {
    const bindings = useContext(RouterBindingsContext);

    const useGo = React.useMemo(
        () => bindings?.go ?? (() => () => undefined),
        [bindings?.go],
    );

    const go = useGo();

    return go;
};
