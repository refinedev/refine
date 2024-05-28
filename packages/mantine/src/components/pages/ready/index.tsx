import * as React from "react";
import type { RefineReadyPageProps } from "@refinedev/ui-types";
import {
  BackgroundImage,
  Code,
  Title,
  Text,
  Group,
  Space,
  Button,
  Anchor,
} from "@mantine/core";

/**
 * @deprecated `ReadyPage` is deprecated and will be removed in the next major release.
 */
export const ReadyPage: React.FC<RefineReadyPageProps> = () => {
  return (
    <BackgroundImage
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#2A132E",
      }}
      py="xl"
      px="sm"
      src="https://refine.ams3.cdn.digitaloceanspaces.com/login-background/background.png"
    >
      <img
        src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
        alt="Refine Logo"
      />
      <Space h={24} />
      <Title align="center" sx={{ color: "white", fontSize: "3rem" }}>
        Welcome on board
      </Title>
      <Text size="xl" sx={{ color: "white" }} mt="md" align="center">
        Your configuration is completed.
      </Text>
      <Text size="lg" sx={{ color: "white" }} mt="md" align="center">
        Now you can get started by adding your resources to the{" "}
        <Code>resources</Code> property of <Code>Refine</Code>.
      </Text>
      <Space h={48} />
      <Group position="center">
        <Anchor href="https://refine.dev" target="_blank" rel="noreferrer">
          <Button variant="default">Documentation</Button>
        </Anchor>
        <Anchor
          href="https://refine.dev/examples"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="default">Examples</Button>
        </Anchor>
        <Anchor
          href="https://discord.gg/refine"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="default">Community</Button>
        </Anchor>
      </Group>
    </BackgroundImage>
  );
};
