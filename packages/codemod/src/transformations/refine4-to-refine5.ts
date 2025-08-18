import path from "path";
import type { API, FileInfo } from "jscodeshift";
import PackageJson from "@npmcli/package-json";

import { metaDataToMeta } from "./v4/metadata-to-meta";
import { moveDeprecatedAccessControlProps } from "./v4/move-deprecated-access-control";
import { resourceNameToResourceForButtons } from "./v4/resourceName-to-resource";
import { useMenuToCore } from "./v4/use-menu-to-core";
import { fixV4Deprecations } from "./v4/fix-v4-deprecations";
import { removeV3LegacyAuthProviderCompatibleFromAuthHooks } from "./v5/remove-v3LegacyAuthProviderCompatible-from-auth-hooks";
import { renameUseFormQueryResultAndMutationResult } from "./rename-query-and-mutation-result/use-form-query-and-mutation-result";
import { renameUseSelectQueryResult } from "./rename-query-and-mutation-result/use-select-query-result";
import { renameUseShowQueryResult } from "./rename-query-and-mutation-result/use-show-query-result";
import { renameUseSimpleListQueryResult } from "./rename-query-and-mutation-result/use-simple-list-query-result";
import { renameUseTableQueryResult } from "./rename-query-and-mutation-result/use-table-query-result";
import { removeUseNewQueryKeysFromRefineOptions } from "./v5/remove-useNewQueryKeys-from-refine-options";
import {
  CONFIG_FILE_NAME,
  CodemodConfig,
  install,
  checkPackageLock,
} from "../helpers";

export async function postTransform(files: any, flags: any) {
  const config = new CodemodConfig(CONFIG_FILE_NAME);

  if (flags.dry) {
    config.destroy();
    return;
  }

  const rootDir = path.join(process.cwd(), files[0]);

  const pkgJson = await PackageJson.load(rootDir);

  const hasPankodCLIInDependencies =
    !!pkgJson.content.dependencies?.["@pankod/refine-cli"];

  const hasPankodCLIInDevDependencies =
    !!pkgJson.content.devDependencies?.["@pankod/refine-cli"];

  const dependencies = {
    ...pkgJson.content.dependencies,
    ...config.getInstalls(),
  };

  const devDependencies = {
    ...pkgJson.content.devDependencies,
  };

  for (const packageName of [...config.getUninstalls(), "@pankod/refine-cli"]) {
    delete dependencies[packageName];
  }

  if (hasPankodCLIInDependencies || hasPankodCLIInDevDependencies) {
    dependencies["@refinedev/cli"] = "latest";
  }

  if (hasPankodCLIInDevDependencies) {
    delete devDependencies["@pankod/refine-cli"];
  }

  Object.keys(dependencies).forEach((dep) => {
    if (
      dep.startsWith("@pankod") &&
      ![
        "@pankod/refine-react-location",
        "@pankod/refine-react-router",
      ].includes(dep)
    ) {
      delete dependencies[dep];

      const isMUI = dep.includes("@pankod/refine-mui");
      const migratableMUIVersion = "^4.18.2";

      dependencies[dep.replace("@pankod/refine-", "@refinedev/")] = isMUI
        ? migratableMUIVersion
        : "latest";
    }
  });

  pkgJson.update({
    dependencies,
    devDependencies,
  });

  await pkgJson.save();

  const useYarn = checkPackageLock(rootDir) === "yarn.lock";

  await install(rootDir, null, { useYarn, isOnline: true });

  config.destroy();
}

export default function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const source = j(file.source);

  removeUseNewQueryKeysFromRefineOptions(j, source);
  fixV4Deprecations(j, source);
  removeV3LegacyAuthProviderCompatibleFromAuthHooks(j, source);
  metaDataToMeta(j, source);
  moveDeprecatedAccessControlProps(j, source);
  resourceNameToResourceForButtons(j, source);
  useMenuToCore(j, source);
  renameUseFormQueryResultAndMutationResult(j, source);
  renameUseSelectQueryResult(j, source);
  renameUseShowQueryResult(j, source);
  renameUseSimpleListQueryResult(j, source);
  renameUseTableQueryResult(j, source);

  return source.toSource();
}
