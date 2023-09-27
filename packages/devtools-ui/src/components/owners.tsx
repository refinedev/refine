import React from "react";
import { cleanFilePath } from "src/utils/clean-file-path";
import { Activity } from "src/interfaces/activity";
import clsx from "clsx";
import { getOwners } from "src/utils/get-owners";

export const Owners = ({ activity }: { activity: Activity }) => {
    const owners = getOwners(activity);

    return (
        <ul className={clsx("re-list-disc", "re-list-inside")}>
            {owners.map((owner, i) => (
                <li key={i}>
                    <div
                        className={clsx(
                            "re--ml-2",
                            "re-inline-flex",
                            "re-flex-col",
                            "re-items-start",
                            "re-gap-1",
                            "re-max-w-[calc(100%-20px)]",
                        )}
                    >
                        <span
                            className={clsx(
                                "re-text-xs",
                                "re-text-gray-300",
                                "re-font-mono",
                                "re-break-all",
                            )}
                        >
                            {owner.function}
                        </span>
                        <small
                            className={clsx(
                                "re-text-[10px]",
                                "re-text-gray-500",
                                "re-break-all",
                            )}
                        >
                            {"at "}
                            {cleanFilePath(owner.file)}
                            {owner.line && `:${owner.line}`}
                            {owner.column && `:${owner.column}`}
                        </small>
                    </div>
                </li>
            ))}
        </ul>
    );
};
