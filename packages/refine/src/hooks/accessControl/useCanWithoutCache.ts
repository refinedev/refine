import { useContext } from "react";

import { AccessControlContext } from "@contexts/accessControl";

export const useCanWithoutCache = () => {
    const { can } = useContext(AccessControlContext);

    return { can };
};
