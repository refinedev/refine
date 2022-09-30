import * as React from "react";
import { RefineReadyPageProps } from "@pankod/refine-ui-types";
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

import logo from "../../../assets/images/refine.svg";

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
            src="https://refine.ams3.cdn.digitaloceanspaces.com/login-background/background.png"
        >
            <img src={logo} alt="Refine Logo" />
            <Space h={48} />
            <Title sx={{ color: "white", fontSize: "3.75rem" }}>
                Welcome on board
            </Title>
            <Title order={2} sx={{ color: "white" }} mt="md">
                Your configuration is completed.
            </Title>
            <Text size="lg" sx={{ color: "white" }} mt="md">
                Now you can get started by adding your resources to the{" "}
                <Code>resources</Code> property of <Code>Refine</Code>
            </Text>
            <Space h={48} />
            <Group>
                <Anchor
                    href="https://refine.dev"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button>Documentation</Button>
                </Anchor>
                <Anchor
                    href="https://refine.dev/examples"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button>Examples</Button>
                </Anchor>
                <Anchor
                    href="https://discord.gg/refine"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button>Community</Button>
                </Anchor>
            </Group>
        </BackgroundImage>
    );
};
