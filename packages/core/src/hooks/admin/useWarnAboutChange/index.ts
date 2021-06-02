import { useContext } from "react";

import { AdminContext } from "@contexts/admin";
import { IAdminContext } from "src/interfaces";

type UseWarnAboutChangeType = () => {
    warnWhenUnsavedChanges: IAdminContext["warnWhenUnsavedChanges"];
    warnWhen: IAdminContext["warnWhen"];
    setWarnWhen: IAdminContext["setWarnWhen"];
};

export const useWarnAboutChange: UseWarnAboutChangeType = () => {
    const { warnWhenUnsavedChanges, warnWhen, setWarnWhen } = useContext(
        AdminContext,
    );

    return { warnWhenUnsavedChanges, warnWhen, setWarnWhen };
};
