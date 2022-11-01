import * as React from "react";
import { RefineReadyPageProps } from "@pankod/refine-ui-types";
import {
    Box,
    Code,
    Heading,
    Text,
    HStack,
    Spacer,
    Button,
    Link,
} from "@chakra-ui/react";

import logo from "../../../assets/images/refine.svg";

export const ReadyPage: React.FC<RefineReadyPageProps> = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#2A132E",
                backgroundImage:
                    "https://refine.ams3.cdn.digitaloceanspaces.com/login-background/background.png",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <img src={logo} alt="Refine Logo" />
            <Spacer h={48} />
            <Heading sx={{ color: "white", fontSize: "3.75rem" }}>
                Welcome on board
            </Heading>
            <Heading as="h2" sx={{ color: "white" }} mt="md">
                Your configuration is completed.
            </Heading>
            <Text size="lg" sx={{ color: "white" }} mt="md">
                Now you can get started by adding your resources to the{" "}
                <Code>resources</Code> property of <Code>Refine</Code>
            </Text>
            <Spacer h={48} />
            <HStack>
                <Link
                    href="https://refine.dev"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button>Documentation</Button>
                </Link>
                <Link
                    href="https://refine.dev/examples"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button>Examples</Button>
                </Link>
                <Link
                    href="https://discord.gg/refine"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button>Community</Button>
                </Link>
            </HStack>
        </Box>
    );
};
