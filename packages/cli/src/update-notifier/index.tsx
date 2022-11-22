import React from "react";
import { render } from "ink";
import Conf from "conf";
import {
    isRefineUptoDate,
    RefinePackageInstalledVersionData,
} from "@commands/check-updates";
import UpdateWarningTable from "@components/update-warning-table";
import spinner from "@utils/spinner";
import { ENV } from "@utils/env";

const STORE_NAME = "update-notifier";

export interface Store {
    lastUpdated: number;
    packages: RefinePackageInstalledVersionData[];
}

export const store = new Conf<Store>({
    projectName: STORE_NAME,
    defaults: {
        lastUpdated: 0,
        packages: [],
    },
});

export const updateNotifier = async () => {
    if (isUpdateNotifierDisabled()) return;

    const packages = shouldUpdatePackages()
        ? await updatePackages()
        : store.get("packages");

    if (!packages?.length) return;

    render(<UpdateWarningTable data={packages} />);
    console.log("\n");
};

export const isUpdateNotifierDisabled = () => {
    return ENV.UPDATE_NOTIFIER_IS_DISABLED.toLocaleLowerCase() === "true";
};

export const updatePackages = async () => {
    const packages = await spinner(isRefineUptoDate, "Checking for updates...");

    store.set("packages", packages);
    store.set("lastUpdated", Date.now());

    return packages;
};

export const shouldUpdatePackages = () => {
    const lastUpdated = store.get("lastUpdated");

    if (!lastUpdated) return true;

    const now = Date.now();

    const diff = now - lastUpdated;
    const cacheTTL = Number(ENV.UPDATE_NOTIFIER_CACHE_TTL);

    return diff >= cacheTTL;
};
