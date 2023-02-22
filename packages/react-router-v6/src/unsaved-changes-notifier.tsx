import React from "react";
import { useTranslate, useWarnAboutChange } from "@pankod/refine-core";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import type { History } from "history";

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
    const navigator = React.useContext(NavigationContext).navigator as History;

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

    React.useEffect(() => {
        if (!warnWhen) return;

        const unblock = navigator.block((transition: any) => {
            if (window.confirm(warnMessage)) {
                setWarnWhen?.(false);
                unblock();
                transition.retry();
            } else {
                navigator.location.pathname = window.location.pathname;
            }
        });
        return unblock;
    }, [warnWhen, location, warnMessage]);

    return null;
};
