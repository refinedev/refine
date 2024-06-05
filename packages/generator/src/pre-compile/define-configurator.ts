import type { PromptObject } from "prompts";
import type { Configurator } from "./configurator";

export type ConfigFileContent = {
  prompts: PromptObject<string>[];
  configurator: Configurator;
};

export const defineConfigurator = (
  prompts: PromptObject<string>[],
  configurator: Configurator
): ConfigFileContent => {
  return {
    prompts,
    configurator,
  };
};
