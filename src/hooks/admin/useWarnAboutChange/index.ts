import { useContext } from "react";

import { AdminContext } from "@contexts/admin";

export const useWarnAboutChange = () => {
    const { warnWhenUnsavedChanges } = useContext(AdminContext);

    return { warnWhenUnsavedChanges };
};
