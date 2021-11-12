import { useContext } from "react";

import { RbacContext } from "@contexts/rbac";

export const useCanWithoutCache = () => {
    const { can } = useContext(RbacContext);

    return { can };
};
