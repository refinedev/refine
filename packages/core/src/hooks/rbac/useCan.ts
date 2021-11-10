import { useContext } from "react";

import { RbacContext } from "@contexts/rbac";

export const useCan = () => {
    const { can } = useContext(RbacContext);

    return {
        can,
    };
};
