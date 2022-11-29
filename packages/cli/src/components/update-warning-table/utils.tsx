import React from "react";
import { render } from "ink";
import { getDependencies, getPreferedPM } from "@utils/package";
import UpdateWarningTable, { UpdateWarningTableProps } from "./table";

const getCommand = async () => {
    const dependencies = getDependencies();

    const isRefineCliInstalled = dependencies.includes("@pankod/refine-cli");

    if (!isRefineCliInstalled) {
        return `npx refine update`;
    }

    const pm = await getPreferedPM();

    return `${pm.name} run refine update`;
};

export const getUpdateWarningTable = async (
    packages: UpdateWarningTableProps["data"],
) => {
    const command = await getCommand();

    render(<UpdateWarningTable data={packages} command={command} />);
};
