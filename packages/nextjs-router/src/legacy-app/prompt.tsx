import React from "react";
import warnOnce from "warn-once";

import type { PromptProps } from "@refinedev/core";

export const Prompt: React.FC<PromptProps> = ({ when }) => {
    React.useEffect(() => {
        warnOnce(
            process.env.NODE_ENV === "development" && (when ?? false),
            "Due to `router.events` not being available in Next.js 13, the `Prompt` component is not working. `warnWhenUnsavedChanges` is not supported.",
        );
    }, [when]);

    return null;
};
