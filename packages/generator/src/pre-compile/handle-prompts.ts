import prompts from "prompts";
import type { PromptObject } from "prompts";

export type HandlePromptsOptions = {
  prompts: PromptObject<string>[];
};

export const handlePrompts = async (options: HandlePromptsOptions) => {
  return await prompts(options.prompts);
};
