import { useEffect, useContext } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import type { History } from "history";

import type { PromptProps } from "@pankod/refine-core";

export const Prompt: React.FC<PromptProps> = ({
    message,
    when,
    setWarnWhen,
}) => {
    const navigator = useContext(NavigationContext).navigator as History;

    useEffect(() => {
        if (!when) return;

        const unblock = navigator.block((transition: any) => {
            if (window.confirm(message)) {
                setWarnWhen?.(false);
                unblock();
                transition.retry();
            } else {
                navigator.location.pathname = window.location.pathname;
            }
        });
        return unblock;
    }, [when, location, message]);

    return null;
};
