import { getProjectType } from "@utils/project";
import { getProviderPath } from "@utils/resource";
import { copySync, mkdirSync, pathExistsSync } from "fs-extra";
import { join } from "path";
import {
  availableProviders,
  type Provider,
  type ProviderId,
} from "./providers";

const baseTemplatePath = `${__dirname}/../templates/provider`;

export const createProviders = (
  providerIds: ProviderId[],
  pathFromArgs?: string,
) => {
  providerIds.forEach((providerId) => {
    const { fileName, templateFileName } = getProviderOptions(providerId);
    const folderPath = pathFromArgs ?? getDefaultPath();
    const filePath = join(folderPath, fileName);
    const fullPath = join(process.cwd(), folderPath, fileName);

    if (pathExistsSync(fullPath)) {
      console.error(`❌ Provider (${filePath}) already exist!`);
      return;
    }

    // create destination dir
    mkdirSync(folderPath, { recursive: true });

    // copy template file to destination
    copySync(`${baseTemplatePath}/${templateFileName}`, fullPath);

    console.log(`🎉 Provider (${filePath}) created successfully!`);
  });
};

export const getProviderOptions = (providerId: ProviderId): Provider => {
  const provider = availableProviders.find((p) => p.id === providerId);

  if (!provider) {
    throw new Error(`Invalid provider: ${providerId}`);
  }

  return provider;
};

export const getDefaultPath = () => {
  const projectType = getProjectType();
  const { path } = getProviderPath(projectType);
  return path;
};
