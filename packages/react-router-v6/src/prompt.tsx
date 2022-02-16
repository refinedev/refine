import { useEffect, useContext } from "react";
import { useLocation } from "react-location";
import { UNSAFE_NavigationContext } from "react-router-dom";
import type { History } from "history";

import type { PromptProps } from "@pankod/refine-core";

export const Prompt: React.FC<PromptProps> = ({
    message,
    when,
    setWarnWhen,
}) => {
    const location = useLocation();
    const navigator = useContext(UNSAFE_NavigationContext).navigator as History;

    useEffect(() => {
        if (!when) return;

        const unblock = location.history.block((transition: any) => {
            if (window.confirm(message)) {
                setWarnWhen?.(false);
                unblock();
                transition.retry();
            } else {
                location.current.pathname = window.location.pathname;
            }
        });
        return unblock;
    }, [navigator, setWarnWhen, when]);

    return null;
};
