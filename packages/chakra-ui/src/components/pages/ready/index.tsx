import * as React from "react";
import { RefineReadyPageProps } from "@pankod/refine-ui-types";
import {
    Box,
    Code,
    Heading,
    Text,
    Button,
    Link,
    Image,
    HStack,
} from "@chakra-ui/react";

import logo from "../../../assets/images/refine.svg";

export const ReadyPage: React.FC<RefineReadyPageProps> = () => {
    return (
        <Box
            p="4"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#2A132E",
                backgroundImage:
                    "https://refine.ams3.cdn.digitaloceanspaces.com/login-background/background.png",
            }}
        >
            <Image mb="16" src={logo} alt="Refine Logo" />

            <Heading mb="10" size="3xl" color="white">
                Welcome on board
            </Heading>
            <Heading size="md" color="white" mb="6">
                Your configuration is completed.
            </Heading>
            <Text size="lg" mb="6" color="white">
                Now you can get started by adding your resources to the{" "}
                <Code>resources</Code> property of <Code>Refine</Code>
            </Text>

            <HStack wrap="wrap" spacing="3" justifyContent="center">
                <Link
                    href="https://refine.dev"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button colorScheme="primary" mb="3">
                        Documentation
                    </Button>
                </Link>
                <Link
                    href="https://refine.dev/examples"
                    target="_blank"
                    rel="noreferrer"
                    mb="3"
                >
                    <Button colorScheme="primary" mb="3">
                        Examples
                    </Button>
                </Link>
                <Link
                    href="https://discord.gg/refine"
                    target="_blank"
                    rel="noreferrer"
                    mb="3"
                >
                    <Button colorScheme="primary" mb="3">
                        Community
                    </Button>
                </Link>
            </HStack>
        </Box>
    );
};
