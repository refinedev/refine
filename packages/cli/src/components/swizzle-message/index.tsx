import React from "react";
import Markdown from "ink-markdown";
import dedent from "dedent";
import { Box, Text } from "ink";

type Props = {
    label: string;
    files: string[];
    message?: string;
};

const SwizzleMessage: React.FC<Props> = ({ label, files, message }) => {
    return (
        <Box
            width={"100%"}
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
        >
            <Text>&nbsp;</Text>
            <Text color="blueBright">
                Successfully swizzled <Text bold>{label}</Text>
            </Text>
            <Text dimColor>File{files.length > 1 ? "s" : ""} created:</Text>
            {files.map((file) => (
                <Text
                    key={file}
                    dimColor
                    color="cyanBright"
                >{` - ${file?.replace(process.cwd(), "")}`}</Text>
            ))}
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
