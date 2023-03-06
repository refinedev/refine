import React from "react";
import { useTranslate, useWarnAboutChange } from "@refinedev/core";
import { usePrompt } from "./use-prompt-workaround";

type UnsavedChangesNotifierProps = {
    translationKey?: string;
    message?: string;
};

export const UnsavedChangesNotifier: React.FC<UnsavedChangesNotifierProps> = ({
    translationKey = "warnWhenUnsavedChanges",
    message = "Are you sure you want to leave? You have unsaved changes.",
}) => {
    const translate = useTranslate();
    const { warnWhen, setWarnWhen } = useWarnAboutChange();

    const warnMessage = React.useMemo(() => {
        return translate(translationKey, message);
    }, [translationKey, message, translate]);

    const warnWhenListener = React.useCallback(
        (e: { preventDefault: () => void; returnValue: string }) => {
            e.preventDefault();

            e.returnValue = warnMessage;

            return e.returnValue;
        },
        [warnMessage],
    );

    React.useEffect(() => {
        if (warnWhen) {
            window.addEventListener("beforeunload", warnWhenListener);
        }

        return window.removeEventListener("beforeunload", warnWhenListener);
    }, [warnWhen, warnWhenListener]);

    usePrompt(warnMessage, warnWhen, () => {
        setWarnWhen?.(false);
    });

    return null;
};
