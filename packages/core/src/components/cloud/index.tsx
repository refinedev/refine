import React, { useContext, useEffect } from "react";
import { IResource } from "@pankod/refine-sdk";

import { CloudContext } from "@contexts/cloud";
import { ResourceContext } from "@contexts/resource";

export const Cloud: React.FC<{}> = () => {
    const cloud = useContext(CloudContext);
    const resourceContext = useContext(ResourceContext);

    useEffect(() => {
        if (cloud && cloud.sdk) {
            const { sdk } = cloud;

            const resources: IResource[] = resourceContext.resources.map(
                (i) => {
                    const { name, list, create, edit, show, canDelete } = i;

                    return {
                        name: name,
                        key: name,
                        hasList: !!list,
                        hasCreate: !!create,
                        hasEdit: !!edit,
                        hasDelete: !!canDelete,
                        hasShow: !!show,
                    };
                },
            );

            sdk.draftResource
                .create({
                    resources,
                })
                .then((res) => console.log("-- res", res));
        }
    }, [resourceContext.resources]);

    return null;
};
