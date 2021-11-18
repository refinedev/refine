import { useLocation } from "react-location";
import { useEffect } from "react";

import type { PromptProps } from "@pankod/refine";

export const Prompt: React.FC<PromptProps> = ({
    message,
    when,
    setWarnWhen,
}) => {
    const location = useLocation();

    useEffect(() => {
        if (!when) return;

        const unblock = location.history.block((transition) => {
            if (window.confirm(message)) {
                setWarnWhen?.(false);
                unblock();
                transition.retry();
            } else {
                location.current.pathname = window.location.pathname;
            }
        });
        return unblock;
    }, [when, location, message]);

    return null;
};
