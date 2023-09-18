import React from "react";
import clsx from "clsx";

import { PackageType } from "@refinedev/devtools-shared";
import { PackageItem } from "src/components/package-item";
import { AddPackageDrawer } from "./add-package-drawer";
import { Button } from "./button";
import { PlusCircleIcon } from "./icons/plus-circle";
import { getInstalledPackages, installPackages } from "src/utils/packages";

export const Packages = () => {
    const [packages, setPackages] = React.useState<PackageType[]>([]);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        getInstalledPackages().then((data) => {
            setPackages(data);
        });
    }, []);

    const [installInProgress, setInstallInProgress] = React.useState(false);
    const onInstall = React.useCallback(async (packagesToInstall: string[]) => {
        setInstallInProgress(true);
        const state = await installPackages(packagesToInstall);

        if (state) {
            getInstalledPackages().then((data) => {
                setPackages(data);
            });
        }

        setInstallInProgress(false);

        return state;
    }, []);

    return (
        <>
            <div
                className={clsx(
                    "re-flex-1",
                    "re-flex",
                    "re-flex-col",
                    "re-gap-8",
                    "re-h-full",
                    "re-w-full",
                    "re-justify-center",
                    "re-overflow-auto",
                    "re-mx-auto",
                )}
            >
                <div
                    className={clsx(
                        "re-flex",
                        "re-items-center",
                        "re-justify-between",
                    )}
                >
                    <div
                        className={clsx(
                            "re-text-sm",
                            "re-leading-6",
                            "re-text-gray-0",
                            "re-font-semibold",
                        )}
                    >
                        Package Overview
                    </div>
                    <div>
                        <Button
                            onClick={() => setVisible(true)}
                            className={clsx(
                                "re-gap-2",
                                "re-text-alt-blue",
                                "re-bg-alt-blue",
                                "re-bg-opacity-[0.15]",
                                "re-flex-nowrap",
                                "re-flex",
                                "re-items-center",
                                "re-justify-between",
                                "!re-px-2",
                            )}
                        >
                            <PlusCircleIcon className="re-text-alt-blue" />
                            <span className="re-text-alt-blue">
                                More packages
                            </span>
                        </Button>
                    </div>
                </div>
                <div
                    className={clsx("re-grid", "re-gap-8")}
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(380px, 1fr))",
                    }}
                >
                    {packages.map((item) => (
                        <PackageItem
                            key={item.name}
                            item={item}
                            onUpdate={(v) => onInstall([v])}
                            blocked={installInProgress}
                        />
                    ))}
                </div>
            </div>
            <AddPackageDrawer
                installedPackages={packages.map((item) => item.name)}
                onClose={() => {
                    setVisible(false);
                    getInstalledPackages().then((data) => {
                        setPackages(data);
                    });
                }}
                onInstall={(pkgs) => onInstall(pkgs)}
                dismissOnOverlayClick
                visible={visible}
            />
        </>
    );
};
