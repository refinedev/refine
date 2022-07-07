import React, { useContext } from "react";

import { RefineKbarPropsContext } from "src";
import { useRefineKbar } from "@hooks";
import { CommandBar } from "@components";

export const RefineKbar: React.FC<{
    commandBarProps?: React.ComponentProps<typeof CommandBar>;
}> = ({ commandBarProps }) => {
    const context = useContext(RefineKbarPropsContext);
    useRefineKbar();
    const props = { ...context, ...commandBarProps };

    return <CommandBar {...props} />;
};
