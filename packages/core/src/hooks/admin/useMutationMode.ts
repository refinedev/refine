import { useContext } from "react";

import { AdminContext } from "@contexts/admin";

export const useMutationMode = () => {
    const { mutationMode, undoableTimeout } = useContext(AdminContext);

    return { mutationMode, undoableTimeout };
};
