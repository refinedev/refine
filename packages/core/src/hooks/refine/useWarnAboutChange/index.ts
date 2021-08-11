import { useContext } from "react";

import { RefineContext } from "@contexts/refine";
import { IRefineContext } from "../../../interfaces";

type UseWarnAboutChangeType = () => {
    warnWhenUnsavedChanges: IRefineContext["warnWhenUnsavedChanges"];
    warnWhen: IRefineContext["warnWhen"];
    setWarnWhen: IRefineContext["setWarnWhen"];
};

/**
 * When you have unsaved changes and try to leave the current page, **refine** shows a confirmation modal box.
 * To activate this feature, set the `warnWhenUnsavedChanges` to `true`.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#warnwhenunsavedchanges} for more details.
 */
export const useWarnAboutChange: UseWarnAboutChangeType = () => {
    const { warnWhenUnsavedChanges, warnWhen, setWarnWhen } =
        useContext(RefineContext);

    return { warnWhenUnsavedChanges, warnWhen, setWarnWhen };
};
