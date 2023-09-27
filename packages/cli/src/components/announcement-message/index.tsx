import React from "react";
import Markdown from "ink-markdown";
import { Box, Text } from "ink";
import { Announcement } from "@definitions/announcement";

type Props = {
    announcements: Announcement[];
};

const AnnouncementMessage: React.FC<Props> = ({ announcements }) => {
    return (
        <Box
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            borderColor="blueBright"
            borderStyle="round"
            paddingLeft={1}
            paddingRight={1}
            paddingTop={1}
            paddingBottom={1}
        >
            {announcements.map(({ content }, i, arr) => (
                <Box display="flex" key={i}>
                    {arr.length > 1 && <Text>· </Text>}
                    <Markdown key={i}>{content.trim()}</Markdown>
                    {i !== arr.length - 1 && arr.length > 1 ? (
                        <Text>{"\n"}</Text>
                    ) : null}
                </Box>
            ))}
        </Box>
    );
};

export default AnnouncementMessage;
