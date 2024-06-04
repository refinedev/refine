import * as React from "react";
import type { RefineReadyPageProps } from "@refinedev/ui-types";
import {
  Box,
  Code,
  Heading,
  Text,
  Button,
  Link,
  Image,
} from "@chakra-ui/react";

/**
 * @deprecated `ReadyPage` is deprecated and will be removed in the next major release.
 */
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
      <Image
        mb="8"
        src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
        alt="Refine Logo"
      />

      <Heading mb="6" as="h1" size="3xl" color="white" textAlign="center">
        Welcome on board
      </Heading>
      <Heading as="h3" size="md" color="white" mb="6" textAlign="center">
        Your configuration is completed.
      </Heading>
      <Text mb="8" fontSize="xl" color="white" textAlign="center">
        Now you can get started by adding your resources to the{" "}
        <Code>resources</Code> property of <Code>Refine</Code>
      </Text>

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap="3">
        <Button
          as={Link}
          href="https://refine.dev"
          target="_blank"
          rel="noreferrer"
          colorScheme="white"
          color="white"
          variant="outline"
          minW="150px"
        >
          Documentation
        </Button>
        <Button
          as={Link}
          href="https://refine.dev/examples"
          target="_blank"
          rel="noreferrer"
          colorScheme="white"
          color="white"
          variant="outline"
          minW="150px"
        >
          Examples
        </Button>
        <Button
          as={Link}
          href="https://discord.gg/refine"
          target="_blank"
          rel="noreferrer"
          colorScheme="white"
          color="white"
          variant="outline"
          minW="150px"
        >
          Community
        </Button>
      </Box>
    </Box>
  );
};
