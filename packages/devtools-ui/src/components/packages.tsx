import React from "react";
import clsx from "clsx";

import { PackageType } from "@refinedev/devtools-shared";
import { PackageItem } from "src/components/package-item";
import { AddPackageDrawer } from "./add-package-drawer";
import { Button } from "./button";

export const Packages = () => {
    const [updating, setUpdating] = React.useState(false);
    const [packages, setPackages] = React.useState<PackageType[]>([]);
    const [visible, setVisible] = React.useState(false);

    const fetchPackages = React.useCallback(async () => {
        try {
            const response = await fetch("api/packages");
            const { data } = (await response.json()) as {
                data: PackageType[];
            };

            setPackages(data);
        } catch (error) {
            //
        }
    }, []);

    React.useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

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
                        <Button onClick={() => setVisible(true)}>
                            add package
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
                    {packages.map((item, index) => (
                        <PackageItem
                            key={index}
                            item={item}
                            onUpdate={(v) => setUpdating(v)}
                            blocked={updating}
                        />
                    ))}
                </div>
            </div>
            <AddPackageDrawer
                installedPackages={[]}
                onClose={() => setVisible(false)}
                dismissOnOverlayClick
                visible={visible}
            />
        </>
    );
};
