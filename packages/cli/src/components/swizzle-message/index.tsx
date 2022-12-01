import React from "react";
import Markdown from "ink-markdown";
import dedent from "dedent";
import { Box, Text } from "ink";
import { SWIZZLE_CODES } from "@utils/swizzle/codes";

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

    return (
        <Box
            width={"100%"}
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
        >
            <Text>&nbsp;</Text>
            {status === "success" && (
                <Text color="blueBright">
                    Successfully swizzled <Text bold>{label}</Text>
                </Text>
            )}
            {status === "warning" && (
                <Text color="yellowBright">
                    Swizzle completed with errors for <Text bold>{label}</Text>
                </Text>
            )}
            {status === "error" && (
                <Text color="redBright">
                    Swizzle failed for <Text bold>{label}</Text>
                </Text>
            )}
            <Text dimColor>File{files.length > 1 ? "s" : ""} created:</Text>
            {files.map(([targetPath, statusCode], index) => {
                if (statusCode === SWIZZLE_CODES.SUCCESS) {
                    return (
                        <Text
                            key={index}
                            dimColor
                            color="cyanBright"
                        >{` - ${targetPath?.replace(process.cwd(), "")}`}</Text>
                    );
                }
                if (statusCode === SWIZZLE_CODES.TARGET_ALREADY_EXISTS) {
                    return (
                        <Text key={index} dimColor color="cyanBright">
                            {` - `}
                            <Text color="yellowBright" bold>
                                [FILE_ALREADY_EXISTS]{" "}
                            </Text>
                            {`${targetPath?.replace(process.cwd(), "")}`}
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
                            {`${targetPath?.replace(process.cwd(), "")}`}
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
            <Text>&nbsp;</Text>
            {message && (
                <>
                    <Markdown>{dedent("\n" + message)}</Markdown>
                    <Text>&nbsp;</Text>
                </>
            )}
        </Box>
    );
};

export default SwizzleMessage;
