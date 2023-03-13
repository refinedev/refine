import React from "react";
import { render } from "ink";
import { getDependencies, getPreferedPM, getScripts } from "@utils/package";
import UpdateWarningTable, { UpdateWarningTableProps } from "./table";

export const getCommand = async () => {
    const fallbackCommand = `npx @refinedev/cli update`;

    const dependencies = getDependencies();
    const scriptKeys = Object.keys(getScripts());

    const hasCli = dependencies.includes("@refinedev/cli");
    const hasScript = scriptKeys.includes("refine");

    if (!hasCli && !hasScript) {
        return fallbackCommand;
    }

    const pm = await getPreferedPM();

    if (hasScript) {
        return `${pm.name} run refine update`;
    }

    if (hasCli) {
        return `npx refine update`;
    }

    return fallbackCommand;
};

export const getUpdateWarningTable = async (
    packages: UpdateWarningTableProps["data"],
) => {
    const command = await getCommand();

    render(<UpdateWarningTable data={packages} command={command} />);
};
