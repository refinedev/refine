import { useContext } from "react";

import { AdminContext } from "@contexts/admin";

export const useWarnAboutChange = () => {
    const { warnWhenUnsavedChanges, warnWhen, setWarnWhen } = useContext(
        AdminContext,
    );

    return { warnWhenUnsavedChanges, warnWhen, setWarnWhen };
};
