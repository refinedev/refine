import { useContext } from "react";

import { AccessControlContext } from "@contexts/accessControl";
import { IAccessControlContext } from "../../interfaces";

export const useCanWithoutCache = (): IAccessControlContext => {
    const { can } = useContext(AccessControlContext);

    return { can };
};
