import React, { useContext, useEffect } from "react";
import { IResource } from "@pankod/refine-sdk";

import { CloudContext } from "@contexts/cloud";
import { useResource } from "@hooks/resource";
import { useSdk } from "@hooks/cloud";

export const Cloud: React.FC<{}> = () => {
    const sdk = useSdk();
    const { resources: contextResources } = useResource();

    useEffect(() => {
        if (sdk) {
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
        }
    }, [contextResources]);

    return null;
};
