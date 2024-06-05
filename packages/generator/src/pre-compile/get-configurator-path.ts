import path from "path";
import JoyCon from "joycon";

export const getConfiguratorPath = async (
  providedPath?: string,
  cwd: string = process.cwd()
) => {
  const configJoycon = new JoyCon();

  const defaultNames = [
    "generator.config.ts",
    "generator.config.js",
    "generator.config.cjs",
    "generator.config.mjs",
  ];

  const isFile = providedPath?.match(/\.(js|ts|cjs|mjs)$/);

  const configPath = await configJoycon.resolve({
    files: providedPath
      ? isFile
        ? [providedPath]
        : defaultNames.map((name) => path.join(providedPath, name))
      : defaultNames,
    cwd,
    stopDir: path.parse(cwd).root,
    packageKey: "generator",
  });

  return configPath;
};
