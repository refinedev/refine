import { Box, Newline, Text } from "ink";
import React from "react";

const CloudMessage: React.FC = () => {
    return (
        <Box
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            borderColor={"greenBright"}
            borderStyle="double"
            padding={1}
        >
            <Text color="greenBright">✅ Zero-trust security model</Text>
            <Text color="greenBright">✅ User/role management</Text>
            <Text color="greenBright">✅ Granular access control</Text>
            <Text color="greenBright">✅ Directory sync</Text>
            <Text color="greenBright">✅ VPN-less secure deployments</Text>
            <Text color="greenBright">✅ Direct connection to DBs</Text>

            <Newline />
            <Text>
                Interested in any of the new backend features of refine? Join
                now and get early access -&gt;
                https://s.refine.dev/meet-enterprise
            </Text>
        </Box>
    );
};

export default CloudMessage;
