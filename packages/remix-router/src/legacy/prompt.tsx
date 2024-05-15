import React from "react";
import { useBlocker } from "@remix-run/react";

import type { PromptProps } from "@refinedev/core";

export const Prompt: React.FC<PromptProps> = ({
  message,
  when,
  setWarnWhen,
}) => {
  const blocker = React.useCallback(() => {
    if (when) {
      if (window.confirm(message)) {
        setWarnWhen?.(false);
        return false;
      }
      return true;
    }
    return false;
  }, [when, message, setWarnWhen]);

  useBlocker(blocker);

  return null;
};
