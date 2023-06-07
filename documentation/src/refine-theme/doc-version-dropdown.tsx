import clsx from "clsx";
import React from "react";
import { TriangleDownIcon } from "@site/src/refine-theme/icons/triangle-down";
import {
    useActiveDocContext,
    useVersions,
} from "@docusaurus/plugin-content-docs/client";
import { useLocation } from "@docusaurus/router";
import { Menu, Transition } from "@headlessui/react";
import Link from "@docusaurus/Link";

export const DocVersionDropdown = () => {
    const { search, hash } = useLocation();
    const docContext = useActiveDocContext();
    const versions = useVersions();

    const getVersionMainDoc = (version) =>
        version.docs.find((doc) => doc.id === version.mainDocId);

    const versionLinks = versions.map((version) => {
        // We try to link to the same doc, in another version
        // When not possible, fallback to the "main doc" of the version
        const versionDoc =
            docContext.alternateDocVersions[version.name] ??
            getVersionMainDoc(version);
        return {
            to: `${versionDoc.path}${search}${hash}`,
            label: version.label,
        };
    });

    return (
        <Menu>
            {({ open }) => (
                <>
                    <span className="rounded-md shadow-sm">
                        <Menu.Button
                            className={clsx(
                                "appearance-none",
                                "border-none",
                                "focus:outline-none",
                                "flex",
                                "items-center",
                                "justify-center",
                                "gap-2",
                                "dark:bg-gray-800 bg-gray-50",
                                "hover:dark:bg-gray-700 hover:bg-gray-100",
                                "transition-colors",
                                "duration-200",
                                "ease-in-out",
                                "select-none",
                                "py-2 pl-2",
                                "rounded-lg",
                            )}
                        >
                            <span
                                className={clsx(
                                    "text-gray-400",
                                    "text-base",
                                    "block",
                                )}
                            >
                                {docContext.activeVersion.label}
                            </span>
                            <TriangleDownIcon className="text-gray-500" />
                        </Menu.Button>
                    </span>

                    <Transition
                        show={open}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            static
                            className={clsx(
                                "absolute right-0 top-[20px] origin-bottom-right",
                                "flex flex-col gap-2",
                                "w-[112px]",
                                "p-2",
                                "bg-gray-700 dark:bg-white",
                                "rounded-lg",
                            )}
                        >
                            {versionLinks.map((version) => {
                                return (
                                    <Menu.Item key={version.label}>
                                        {() => {
                                            const isActive =
                                                version.label ===
                                                docContext.activeVersion.label;
                                            return (
                                                <Link
                                                    to={version.to}
                                                    className={clsx(
                                                        "px-2 py-1",
                                                        "rounded-[4px]",
                                                        "hover:no-underline",
                                                        {
                                                            "text-white": true,
                                                            "dark:text-gray-900":
                                                                !isActive,
                                                        },
                                                        {
                                                            "bg-refine-blue":
                                                                isActive,
                                                            "hover:bg-gray-600":
                                                                !isActive,
                                                            "dark:hover:bg-gray-100":
                                                                !isActive,
                                                        },
                                                    )}
                                                >
                                                    {version.label}
                                                </Link>
                                            );
                                        }}
                                    </Menu.Item>
                                );
                            })}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
};
