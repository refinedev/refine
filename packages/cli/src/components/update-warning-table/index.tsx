import React, { FC, useRef } from "react";
import Table from "ink-table";
import { Box, Text, TextProps } from "ink";
import { RefinePackageInstalledVersionData } from "src/interfaces";

const columIndex = {
    name: 1,
    current: 2,
    wanted: 3,
    latest: 4,
};

const LAST_COLUMN_INDEX = 4;

const getVersions = (text: string) => {
    const versions = text.split(".");
    return {
        major: versions[0],
        minor: versions[1],
        patch: versions[2],
    };
};

const getColorsByVersionDiffrence = (
    version1: ReturnType<typeof getVersions>,
    version2: ReturnType<typeof getVersions>,
    color: TextProps["color"],
) => {
    const isMajorDiffrence = version1.major.trim() !== version2.major.trim();
    const isMinorDiffrence = isMajorDiffrence
        ? true
        : version1.minor.trim() !== version2.minor.trim();
    const isPatchDiffrence = isMinorDiffrence
        ? true
        : version1.patch.trim() !== version2.patch.trim();

    return {
        major: isMajorDiffrence ? color : "white",
        minor: isMinorDiffrence ? color : "white",
        patch: isPatchDiffrence ? color : "white",
    };
};

interface UpdateWarningTableProps {
    data: RefinePackageInstalledVersionData[];
}

const UpdateWarningTable: FC<UpdateWarningTableProps> = ({ data }) => {
    const cellIndex = useRef(1);
    const packageIndex = useRef(0);

    return (
        <Box
            width={"100%"}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <Text>Update Available</Text>
            <Table
                data={data}
                cell={(props) => {
                    let TextComponent: JSX.Element = (
                        <Text>{props.children}</Text>
                    );

                    const text = props.children?.toString();
                    if (!text) return TextComponent;

                    if (cellIndex.current === columIndex.wanted) {
                        const currentPackageCurrentVersions = getVersions(
                            data[packageIndex.current].current,
                        );
                        const currentVersions = getVersions(text);

                        const colors = getColorsByVersionDiffrence(
                            currentPackageCurrentVersions,
                            currentVersions,
                            "yellow",
                        );

                        TextComponent = (
                            <VersionText
                                major={{
                                    color: colors.major,
                                    text: currentVersions.major,
                                }}
                                minor={{
                                    color: colors.minor,
                                    text: currentVersions.minor,
                                }}
                                patch={{
                                    color: colors.patch,
                                    text: currentVersions.patch,
                                }}
                            />
                        );
                    }

                    if (cellIndex.current === columIndex.latest) {
                        const currentPackageCurrentVersions = getVersions(
                            data[packageIndex.current].current,
                        );
                        const currentVersions = getVersions(text);

                        const colors = getColorsByVersionDiffrence(
                            currentPackageCurrentVersions,
                            currentVersions,
                            "red",
                        );

                        TextComponent = (
                            <VersionText
                                major={{
                                    color: colors.major,
                                    text: currentVersions.major,
                                }}
                                minor={{
                                    color: colors.minor,
                                    text: currentVersions.minor,
                                }}
                                patch={{
                                    color: colors.patch,
                                    text: currentVersions.patch,
                                }}
                            />
                        );
                    }

                    if (cellIndex.current === LAST_COLUMN_INDEX) {
                        packageIndex.current += 1;
                        cellIndex.current = 1;
                    } else {
                        cellIndex.current += 1;
                    }

                    return TextComponent;
                }}
            />
            <Text>
                To upgrade <Text bold>`refine`</Text> packages with the latest
                version
            </Text>
            <Text>
                Run to following command{" "}
                <Text color="yellow">`refine upgrade`</Text>
            </Text>
        </Box>
    );
};

const VersionText = ({
    major,
    minor,
    patch,
}: {
    major: { text: string; color: TextProps["color"] };
    minor: { text: string; color: TextProps["color"] };
    patch: { text: string; color: TextProps["color"] };
}) => {
    return (
        <Text>
            <Text color={major.color}>{major.text}</Text>
            <Text color={minor.color}>.{minor.text}.</Text>
            <Text color={patch.color}>{patch.text}</Text>
        </Text>
    );
};

export default UpdateWarningTable;
