import React, { useEffect } from "react";
import { useResource } from "@pankod/refine-core";
import { IResource } from "@pankod/refine-sdk";

import { useSdk } from "../../hooks";

export const Cloud: React.FC<{}> = () => {
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

        // send cloud sdk
        sdk.draftResource.create({
            resources,
        });
    }, [contextResources]);

    return null;
};
