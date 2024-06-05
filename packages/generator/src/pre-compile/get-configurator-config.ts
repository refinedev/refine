import path from "path";
import chalk from "chalk";
import { bundleRequire } from "bundle-require";

import { getConfiguratorPath } from "./get-configurator-path";
import type { ConfigFileContent } from "./define-configurator";

export const getConfiguratorConfig = async (
  providedPath?: string,
  cwd: string = process.cwd()
) =>
  new Promise<{ config: ConfigFileContent; configDir: string }>(
    async (resolve, reject) => {
      const configPath = await getConfiguratorPath(providedPath, cwd);

      if (!configPath) {
        reject("No config file found (path)");
        return;
      }

      let config: ConfigFileContent | undefined = undefined;

      const bundled = await bundleRequire({
        filepath: configPath,
      });

      config = bundled.mod.default || bundled.mod;

      if (!config) {
        reject("No config file found");
        return;
      }

      const configDir = path.dirname(configPath);

      if (
        !providedPath ||
        path.resolve(configDir) !== path.resolve(providedPath)
      ) {
        console.log(
          "Config file found at",
          chalk.bold.blueBright(path.relative(process.cwd(), configPath))
        );
      }

      resolve({
        config,
        configDir,
      });
    }
  );
