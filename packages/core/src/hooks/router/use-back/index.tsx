import { RouterBindingsContext } from "@contexts/router";
import React, { useContext } from "react";

export const useBack = () => {
    const bindings = useContext(RouterBindingsContext);

    const useBack = React.useMemo(
        () => bindings?.back ?? (() => () => undefined),
        [bindings?.back],
    );

    const back = useBack();

    return back;
};
