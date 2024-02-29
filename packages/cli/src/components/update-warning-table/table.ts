import React from "react";
import { RefinePackageInstalledVersionData } from "@definitions/package";
import Table from "cli-table3";
import chalk from "chalk";
import center from "center-align";
import { getDependencies, getPreferedPM, getScripts } from "@utils/package";
import { removeANSIColors } from "@utils/text";

const columns = {
  name: "name",
  current: "current",
  wanted: "wanted",
  latest: "latest",
  changelog: "changelog",
} as const;

const orderedColumns: (typeof columns)[keyof typeof columns][] = [
  columns.name,
  columns.current,
  columns.wanted,
  columns.latest,
  columns.changelog,
];

export interface UpdateWarningTableParams {
  data: RefinePackageInstalledVersionData[];
}

export const printUpdateWarningTable = async (
  params: UpdateWarningTableParams,
) => {
  const data = params?.data;
  const tableHead = Object.keys(data?.[0] || {});
  if (!data || !tableHead.length) return;

  const table = new Table({
    head: orderedColumns,
    style: {
      head: ["blue"],
    },
  });

  data.forEach((row) => {
    table.push(
      orderedColumns.map((column) => {
        const columnValue = row[column];
        if (!columnValue) return columnValue;

        if (column === "latest" || column === "wanted") {
          const installedVersion = parseVersions(row.current);
          const latestVersion = parseVersions(columnValue);
          const colors = getColorsByVersionDiffrence(
            installedVersion,
            latestVersion,
          );
          const textMajor = chalk[colors.major](latestVersion.major);
          const textMinor = chalk[colors.minor](latestVersion.minor);
          const textPatch = chalk[colors.patch](latestVersion.patch);
          return `${textMajor}.${textMinor}.${textPatch}`;
        }

        if (column === "changelog") {
          return chalk.blueBright.underline(columnValue);
        }

        return columnValue;
      }),
    );
  });

  const tableOutput = table.toString();
  const tableWidth = removeANSIColors(
    tableOutput.split("\n")?.[0] || "",
  ).length;
  console.log();
  console.log(center("Update Available", tableWidth));
  console.log(tableOutput);
  console.log(
    center(
      `To update ${chalk.bold("`refine`")} packages with wanted version`,
      tableWidth,
    ),
  );
  console.log(
    center(
      ` Run the following command: ${chalk.yellowBright(
        await getInstallCommand(),
      )}`,
      tableWidth,
    ),
  );
  console.log();
};

const parseVersions = (text: string) => {
  const versions = text.split(".");
  return {
    major: versions[0],
    minor: versions[1],
    patch: versions[2],
  };
};

const getColorsByVersionDiffrence = (
  installedVersion: ReturnType<typeof parseVersions>,
  nextVersion: ReturnType<typeof parseVersions>,
) => {
  const isMajorDiffrence =
    installedVersion.major.trim() !== nextVersion.major.trim();

  if (isMajorDiffrence)
    return {
      major: "red",
      minor: "red",
      patch: "red",
    } as const;

  const isMinorDiffrence =
    installedVersion.minor.trim() !== nextVersion.minor.trim();

  if (isMinorDiffrence)
    return {
      major: "white",
      minor: "yellow",
      patch: "yellow",
    } as const;

  const isPatchDiffrence =
    installedVersion.patch.trim() !== nextVersion.patch.trim();
  if (isPatchDiffrence)
    return {
      major: "white",
      minor: "white",
      patch: "green",
    } as const;

  return {
    major: "white",
    minor: "white",
    patch: "white",
  } as const;
};

export const getInstallCommand = async () => {
  const fallbackCommand = "npx @refinedev/cli update";

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
    return "npx refine update";
  }

  return fallbackCommand;
};
