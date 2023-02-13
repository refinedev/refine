import { RouterBindingsContext } from "@contexts/router";
import React, { useContext } from "react";
import warnOnce from "warn-once";

export const useBack = () => {
    const bindings = useContext(RouterBindingsContext);

    const useBack = React.useMemo(
        () =>
            bindings?.back ??
            (() => () => {
                warnOnce(
                    !bindings?.back,
                    "`back` is not defined in router bindings. Please check your `<Refine>` component.",
                );
            }),
        [bindings?.back],
    );

    const back = useBack();

    return back;
};
