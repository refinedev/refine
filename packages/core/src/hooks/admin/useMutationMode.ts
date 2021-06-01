import { useContext } from "react";

import { AdminContext } from "@contexts/admin";
import { IAdminContext } from "src/interfaces";

type UseMutationModeType = () => {
    mutationMode: IAdminContext["mutationMode"];
    undoableTimeout: IAdminContext["undoableTimeout"];
};

export const useMutationMode: UseMutationModeType = () => {
    const { mutationMode, undoableTimeout } = useContext(AdminContext);

    return { mutationMode, undoableTimeout };
};
