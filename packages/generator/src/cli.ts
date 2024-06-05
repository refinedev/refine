#!/usr/bin/env node

import path from "path";

import { generate } from "./compile/generate";
import { getConfiguratorConfig } from "./pre-compile/get-configurator-config";

const configFile = process.argv[2] ? path.resolve(process.argv[2]) : undefined;

(async () => {
  const { config, configDir } = await getConfiguratorConfig(configFile);

  await generate(config.prompts, config.configurator, configDir);
})();
