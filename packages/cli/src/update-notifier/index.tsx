import Conf from "conf";
import chalk from "chalk";
import { isRefineUptoDate } from "@commands/check-updates";
import { printUpdateWarningTable } from "@components/update-warning-table";
import { RefinePackageInstalledVersionData } from "@definitions/package";
import { getInstalledRefinePackages } from "@utils/package";
import { ENV } from "@utils/env";
import { stringToBase64 } from "@utils/encode";

const STORE_NAME = "refine-update-notifier";

export interface Store {
  key: string;
  lastUpdated: number;
  packages: RefinePackageInstalledVersionData[];
}

export const store = new Conf<Store>({
  projectName: STORE_NAME,
  defaults: {
    key: "",
    lastUpdated: 0,
    packages: [],
  },
});

// update notifier should not throw any unhandled error to prevent breaking user workflow.
export const updateNotifier = async () => {
  if (isUpdateNotifierDisabled()) return;

  const shouldUpdate = await shouldUpdatePackagesCache();
  if (shouldUpdate === null) return;
  if (shouldUpdate) {
    updatePackagesCache();
    return;
  }

  showWarning();
  updatePackagesCache();
};

/**
 * renders outdated packages table if there is any
 */
const showWarning = async () => {
  const packages = store.get("packages");
  if (!packages?.length) return;

  await printUpdateWarningTable({ data: packages });
  console.log("\n");
};

/**
 * @returns `null` It's mean something went wrong while checking key or cache. so we should not update cache.
 * @returns `boolean` if cache should be updated or not
 *   if cache is expired or key is invalid, update cache in background and not show warning
 */
export const shouldUpdatePackagesCache = async () => {
  const isKeyValid = await validateKey();
  const isExpired = isPackagesCacheExpired();

  if (isKeyValid === null) return null;

  if (isExpired || !isKeyValid) return true;

  return false;
};

/**
 * @returns `null` something went wrong
 * @returns `packages` if packages updated
 */
export const updatePackagesCache = async () => {
  try {
    const packages = await isRefineUptoDate();

    store.set("packages", packages);
    store.set("lastUpdated", Date.now());
    store.set("key", await generateKeyFromPackages());

    return packages;
  } catch (error) {
    // invalidate store
    store.set("packages", []);
    store.set("lastUpdated", Date.now());
    store.set("key", "");
    return null;
  }
};

export const isPackagesCacheExpired = () => {
  const lastUpdated = store.get("lastUpdated");

  if (!lastUpdated) return true;

  const now = Date.now();

  const diff = now - lastUpdated;
  const cacheTTL = Number(ENV.UPDATE_NOTIFIER_CACHE_TTL);

  return diff >= cacheTTL;
};

/**
 * @returns `true` if key is valid
 * @returns `false` if key is invalid
 * @returns `null` if there is an error
 */
export const validateKey = async () => {
  const key = store.get("key");
  const newKey = await generateKeyFromPackages();

  if (newKey === null) return null;

  return key === newKey;
};

/**
 * @returns `null` if there is an error
 * @returns `string` if key is generated
 */
export const generateKeyFromPackages = async () => {
  const packages = await getInstalledRefinePackages();
  if (!packages) {
    console.error(
      chalk.red(
        "Something went wrong when trying to get installed `refine` packages.",
      ),
    );

    return null;
  }

  const currentVersionsWithName = packages.map((p) => `${p.name}@${p.version}`);
  const hash = stringToBase64(currentVersionsWithName.toString());

  return hash;
};

export const isUpdateNotifierDisabled = () => {
  return ENV.UPDATE_NOTIFIER_IS_DISABLED.toLocaleLowerCase() === "true";
};
