import React from "react";
import Markdown from "ink-markdown";
import dedent from "dedent";
import { Box, Text } from "ink";
import { SWIZZLE_CODES } from "@utils/swizzle/codes";
import { renderCodeMarkdown } from "@utils/swizzle/renderCodeMarkdown";

type Props = {
    label: string;
    files: [targetPath: string, statusCode: string][];
    message?: string;
};

const SwizzleMessage: React.FC<Props> = ({
    label,
    files,
    message = "**`Warning:`** You should use the component where you want to use it.",
}) => {
    const errors = files.filter(([, statusCode]) =>
        Object.values(SWIZZLE_CODES)
            .filter((code) => code !== SWIZZLE_CODES.SUCCESS)
            .includes(statusCode),
    );

    let status = "success";

    switch (errors.length) {
        // no errors
        case 0:
            status = "success";
            break;
        // all errors
        case files.length:
            status = "error";
            break;
        // some errors
        default:
            status = "warning";
            break;
    }

    const renderStatusMessage = () => {
        switch (status) {
            case "success":
                return (
                    <Text color="blueBright">
                        Successfully swizzled <Text bold>{label}</Text>
                    </Text>
                );
            case "warning":
                return (
                    <Text color="yellowBright">
                        Swizzle completed with errors for{" "}
                        <Text bold>{label}</Text>
                    </Text>
                );
            case "error":
                return (
                    <Text color="redBright">
                        Swizzle failed for <Text bold>{label}</Text>
                    </Text>
                );
        }
        return null;
    };

    const clearFilePath = (filePath: string) => {
        const relative = filePath?.replace(process.cwd(), "");

        if (relative?.startsWith("/")) {
            return relative.slice(1);
        }
        if (relative?.startsWith("./")) {
            return relative.slice(2);
        }
        return relative;
    };

    const renderFiles = () => {
        return (
            <>
                <Text dimColor>File{files.length > 1 ? "s" : ""} created:</Text>
                {files.map(([targetPath, statusCode], index) => {
                    if (statusCode === SWIZZLE_CODES.SUCCESS) {
                        return (
                            <Text
                                key={index}
                                dimColor
                                color="cyanBright"
                            >{` - ${clearFilePath(targetPath)}`}</Text>
                        );
                    }
                    if (statusCode === SWIZZLE_CODES.TARGET_ALREADY_EXISTS) {
                        return (
                            <Text key={index} dimColor color="cyanBright">
                                {` - `}
                                <Text color="yellowBright" bold>
                                    [FILE_ALREADY_EXISTS]{" "}
                                </Text>
                                {`${clearFilePath(targetPath)}`}
                            </Text>
                        );
                    }
                    if (statusCode === SWIZZLE_CODES.SOURCE_PATH_NOT_A_FILE) {
                        return (
                            <Text key={index} dimColor color="cyanBright">
                                {` - `}
                                <Text color="yellowBright" bold>
                                    [SOURCE NOT FOUND]{" "}
                                </Text>
                                {`${clearFilePath(targetPath)}`}
                            </Text>
                        );
                    }
                    return (
                        <Text key={index} dimColor color="cyanBright">
                            {` - `}
                            <Text color="yellowBright" bold>
                                [{statusCode}]
                            </Text>
                        </Text>
                    );
                })}
            </>
        );
    };

    const renderSwizzleMessage = () => {
        if (message && status !== "error") {
            return (
                <>
                    <Markdown code={renderCodeMarkdown}>
                        {dedent("\n" + message)}
                    </Markdown>
                    <Text>&nbsp;</Text>
                </>
            );
        }
        return null;
    };

    return (
        <Box
            width={"100%"}
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
        >
            <Text>&nbsp;</Text>
            {renderStatusMessage()}
            {renderFiles()}
            <Text>&nbsp;</Text>
            {renderSwizzleMessage()}
        </Box>
    );
};

export default SwizzleMessage;
