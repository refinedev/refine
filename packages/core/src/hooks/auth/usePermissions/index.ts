import { useContext, useState, useEffect } from "react";

import { AuthContext } from "@contexts/auth";
import { ResourceContext } from "@contexts/resource";

import { IAuthContext } from "../../../interfaces";
import { useQuery, UseQueryResult } from "react-query";

type AllowType =
    | "allowList"
    | "allowCreate"
    | "allowEdit"
    | "allowShow"
    | "allowDelete"
    | "allowSideBar";

export const usePermissions = (): UseQueryResult<any, unknown> => {
    const { getPermissions } = useContext<IAuthContext>(AuthContext);

    const queryResponse = useQuery("usePermissions", getPermissions);

    return queryResponse;
};

export const useAllow = (
    allowType: AllowType,
    routeResourceName: string,
): { canAllow: boolean } => {
    const { resources } = useContext(ResourceContext);
    const { data: permissionsData } = usePermissions();
    const [canAllow, setCanAllow] = useState<boolean>(false);

    useEffect(() => {
        if (resources && permissionsData) {
            const currentRes = resources.find(
                (x) => x.name === routeResourceName,
            );
            if (currentRes) {
                permissionsData.map((p: string) => {
                    if (!currentRes[allowType]) {
                        setCanAllow(true);
                    } else if (currentRes[allowType]?.list.includes(p)) {
                        setCanAllow(currentRes[allowType]!.hasPermission);
                    } else {
                        setCanAllow(!currentRes[allowType]!.hasPermission);
                    }
                });
            }
        }
    }, [resources, permissionsData, routeResourceName]);

    return { canAllow };
};
