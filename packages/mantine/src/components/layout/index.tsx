import React, { FC, PropsWithChildren, useState } from "react";
import {
    AppShell,
    Box,
    Avatar,
    Burger,
    Header,
    MediaQuery,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { LayoutProps, useGetIdentity } from "@pankod/refine-core";
import { Sider } from "./Sider";

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
    const theme = useMantineTheme();

    const [opened, setOpened] = useState(false);

    const { data: user } = useGetIdentity();

    const shouldRenderHeader = user && (user.name || user.avatar);

    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            navbar={<Sider opened={opened} />}
            header={
                shouldRenderHeader && (
                    <Header height={70} p="md">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            <MediaQuery
                                largerThan="sm"
                                styles={{ display: "none" }}
                            >
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="xl"
                                />
                            </MediaQuery>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "16px",
                                        marginLeft: "auto",
                                    }}
                                >
                                    <Text>{user.name}</Text>
                                    <Avatar src={user.avatar} alt={user.name} />
                                </Box>
                            </Box>
                        </div>
                    </Header>
                )
            }
        >
            {children}
        </AppShell>
    );
};
