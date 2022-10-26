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
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            bg="sider.background"
            bgImage="https://refine.ams3.cdn.digitaloceanspaces.com/login-background/background.png"
        >
            <Image mb="8" src={logo} alt="Refine Logo" />

            <Heading mb="6" as="h1" size="3xl" color="white">
                Welcome on board
            </Heading>
            <Heading as="h3" size="md" color="white" mb="6">
                Your configuration is completed.
            </Heading>
            <Text mb="8" fontSize="xl" color="white">
                Now you can get started by adding your resources to the{" "}
                <Code>resources</Code> property of <Code>Refine</Code>
            </Text>

            <HStack wrap="wrap" spacing="3" justifyContent="center">
                <Button
                    as={Link}
                    href="https://refine.dev"
                    target="_blank"
                    rel="noreferrer"
                    colorScheme="green"
                >
                    Documentation
                </Button>
                <Button
                    as={Link}
                    href="https://refine.dev/examples"
                    target="_blank"
                    rel="noreferrer"
                    colorScheme="green"
                >
                    Examples
                </Button>
                <Button
                    as={Link}
                    href="https://discord.gg/refine"
                    target="_blank"
                    rel="noreferrer"
                    colorScheme="green"
                >
                    Community
                </Button>
            </HStack>
        </Box>
    );
};
