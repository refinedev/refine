import React from "react";
import { useTranslate, useWarnAboutChange } from "@refinedev/core";
import { useBlocker, useLocation } from "@tanstack/react-router";

type UnsavedChangesNotifierProps = {
  translationKey?: string;
  message?: string;
};

export const UnsavedChangesNotifier: React.FC<UnsavedChangesNotifierProps> = ({
  translationKey = "warnWhenUnsavedChanges",
  message = "Are you sure you want to leave? You have unsaved changes.",
}) => {
  const translate = useTranslate();
  const location = useLocation();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();

  React.useEffect(() => {
    return () => setWarnWhen?.(false);
  }, [location.pathname, setWarnWhen]);

  const warnMessage = React.useMemo(() => {
    return translate(translationKey, message);
  }, [translationKey, message, translate]);

  const serializedSearch = React.useMemo(() => {
    return JSON.stringify(location.search);
  }, [location.search]);

  const blocker = useBlocker({
    shouldBlockFn: ({ next }) => {
      if (!warnWhen) {
        return false;
      }

      return (
        next.pathname !== location.pathname ||
        JSON.stringify(next.search) !== serializedSearch
      );
    },
    enableBeforeUnload: warnWhen,
    withResolver: true,
  }) as
    | {
        status: string;
        proceed?: () => void;
        reset?: () => void;
      }
    | undefined;

  React.useEffect(() => {
    if (blocker?.status !== "blocked") {
      return;
    }

    const confirm = window.confirm(warnMessage);

    if (confirm) {
      setWarnWhen?.(false);
      blocker.proceed?.();
      return;
    }

    blocker.reset?.();
  }, [blocker, blocker?.status, setWarnWhen, warnMessage]);

  return null;
};
