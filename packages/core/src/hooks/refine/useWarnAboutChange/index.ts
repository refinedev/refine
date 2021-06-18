import { useContext } from "react";

import { RefineContext } from "@contexts/refine";
import { IRefineContext } from "src/interfaces";

type UseWarnAboutChangeType = () => {
    warnWhenUnsavedChanges: IRefineContext["warnWhenUnsavedChanges"];
    warnWhen: IRefineContext["warnWhen"];
    setWarnWhen: IRefineContext["setWarnWhen"];
};

export const useWarnAboutChange: UseWarnAboutChangeType = () => {
    const { warnWhenUnsavedChanges, warnWhen, setWarnWhen } =
        useContext(RefineContext);

    return { warnWhenUnsavedChanges, warnWhen, setWarnWhen };
};
