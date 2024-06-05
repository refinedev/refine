import type { PromptObject } from "prompts";

export const INITIAL_PROMPTS = (initialName?: string): PromptObject<string>[] => [
    {
      type: "text",
      name: "projectName",
      message: "Project Name",
      initial: initialName
    },
  ];