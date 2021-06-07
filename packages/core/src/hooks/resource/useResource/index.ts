import { useContext, useEffect, useState } from "react";
import { usePermissions } from "@hooks";

import { ResourceContext } from "@contexts/resource";
import { IResourceItem } from "../../../interfaces";

export const useResource = () => {
    const { resources } = useContext(ResourceContext);

    return { resources };
};

export const useAllowSideBarResources = (): {
    allowSideBarResources: IResourceItem[];
} => {
    const { resources } = useContext(ResourceContext);
    const { data: permissionsData } = usePermissions();
    const [allowSideBarResources, setAllowSideBarResources] = useState<
        IResourceItem[]
    >([]);

    useEffect(() => {
        if (resources && permissionsData) {
            resources.map((r) =>
                permissionsData.map((p: string) => {
                    if (!r.allowSideBar) {
                        setAllowSideBarResources((prev) => {
                            return [...prev, r];
                        });
                    } else if (
                        r.allowSideBar?.list.includes(p) &&
                        r.allowSideBar.hasPermission
                    ) {
                        setAllowSideBarResources((prev) => {
                            return [...prev, r];
                        });
                    }
                }),
            );
        }
    }, [resources, permissionsData]);

    return { allowSideBarResources };
};
