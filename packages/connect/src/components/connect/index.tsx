import React, { useEffect } from "react";
import { useResource } from "@refinedev/core";
import { IResource } from "@refinedev/sdk";

import { useSdk } from "../../hooks";

export const Connect: React.FC<{}> = () => {
    const { sdk } = useSdk();
    const { resources: contextResources } = useResource();

    useEffect(() => {
        const resources: IResource[] = contextResources.map((i) => {
            const { name, route, list, create, edit, show, canDelete } = i;

            return {
                name: name,
                key: route!,
                hasList: !!list,
                hasCreate: !!create,
                hasEdit: !!edit,
                hasDelete: !!canDelete,
                hasShow: !!show,
            };
        });

        // send connect sdk
        sdk.draftResource.create({
            resources,
        });
    }, [contextResources]);

    return null;
};
