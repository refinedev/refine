import React from "react";

import { useCan } from "@hooks";
import { CanParams } from "../../interfaces";

export type CanAccessProps = CanParams & {
    fallback?: React.ReactNode;
    children: React.ReactNode;
};

export const CanAccess: React.FC<CanAccessProps> = ({
    resource,
    action,
    params,
    fallback,
    children,
    ...rest
}) => {
    const { data } = useCan({
        resource,
        action,
        params,
    });

    if (data?.can) {
        if (React.isValidElement(children)) {
            const Children = React.cloneElement(children, rest);
            return Children;
        }

        return <>{children}</>;
    }

    if (data?.can === false) {
        return <>{fallback ?? null}</>;
    }

    return null;
};
