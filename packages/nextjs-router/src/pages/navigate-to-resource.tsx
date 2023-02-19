import { useResource, useGetToPath } from "@pankod/refine-core";
import React from "react";
import { useRouter } from "next/router";

type NavigateToResourceProps = {
    resource?: string;
    meta?: Record<string, unknown>;
};

export const NavigateToResource = ({
    resource: resourceProp,
    meta,
}: NavigateToResourceProps) => {
    const { replace } = useRouter();
    const getToPath = useGetToPath();
    const { resource, resources } = useResource(resourceProp);

    const toResource = React.useMemo(
        () => resource || resources.find((r) => r.list),
        [resource, resources],
    );

    React.useEffect(() => {
        if (toResource) {
            const path = getToPath({
                resource: toResource,
                action: "list",
                meta,
            });

            if (path) {
                replace(path);
            }
        }
    }, [toResource, replace, getToPath]);

    return null;
};
