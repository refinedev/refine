import { RouterBindingsContext } from "@contexts/router";
import React, { useContext } from "react";

export const usePrompt = () => {
    const bindings = useContext(RouterBindingsContext);

    const usePrompt = React.useMemo(
        () => bindings?.prompt ?? (() => () => undefined),
        [bindings?.prompt],
    );

    const prompt = usePrompt();

    return prompt;
};
