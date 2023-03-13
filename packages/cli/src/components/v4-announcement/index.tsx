import React from "react";
import { Box, Text, Newline } from "ink";

const V4Announcement: React.FC = () => {
    return (
        <Box
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            borderColor={"greenBright"}
            borderStyle="double"
            padding={1}
        >
            <Text color="cyanBright">
                refine v4 is released 🎉 You can upgrade to v4 with a single
                command without hassle!
            </Text>
            <Newline />
            <Text color="greenBright">✅ %100 Backwards compatible</Text>
            <Text color="greenBright">✅ Bring your own router</Text>
            <Text color="greenBright">✅ Reduced bundle size</Text>
            <Text color="greenBright">✅ More consistent API</Text>
            <Newline />
            <Text>
                See the migration guide here:
                https://refine.dev/docs/migration-guide/3x-to-4x
            </Text>
        </Box>
    );
};

export default V4Announcement;
