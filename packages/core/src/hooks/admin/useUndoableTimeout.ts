import { useContext } from "react";

import { AdminContext } from "@contexts/admin";

export const useUndoableTimeout = () => {
    const { undoableTimeout } = useContext(AdminContext);

    return { undoableTimeout };
};
