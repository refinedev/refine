import React from "react";

import { useCan, useRefineContext } from "@hooks";
import { CanParams } from "../../interfaces";

export type CanAccessProps = CanParams & {
    fallback?: React.ReactNode;
};

export const CanAccess: React.FC<CanAccessProps> = ({
    resource,
    action,
    params,
    fallback,
    children,
}) => {
    const { catchAll } = useRefineContext();

    const { data } = useCan({
        resource,
        action,
        params,
    });

    if (data) {
        return <>{children}</>;
    }

    if (data === false) {
        return <>{fallback ?? catchAll}</>;
    }

    return null;
};
