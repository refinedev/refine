import { useContext } from "react";

import { AdminContext } from "@contexts/admin";

export const useMutationMode = () => {
    const { mutationMode } = useContext(AdminContext);

    return { mutationMode };
};
