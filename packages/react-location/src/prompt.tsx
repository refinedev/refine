import { useLocation } from "@tanstack/react-location";
import { useEffect } from "react";

import type { PromptProps } from "@pankod/refine-core";

export const Prompt: React.FC<PromptProps> = ({
    message,
    when,
    setWarnWhen,
}) => {
    const location = useLocation();

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
    }, [when, location, message]);

    return null;
};
