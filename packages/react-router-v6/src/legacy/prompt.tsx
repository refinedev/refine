import { usePrompt } from "../use-prompt-workaround";

import type { PromptProps } from "@refinedev/core";

export const Prompt: React.FC<PromptProps> = ({
  message,
  when,
  setWarnWhen,
}) => {
  usePrompt(
    message,
    when,
    () => {
      setWarnWhen?.(false);
    },
    true,
  );

  return null;
};
