import React from "react";
import { Box } from "@mantine/core";

import { RefineThemedLayoutProps } from "./types";
import { ThemedSider as DefaultSider } from "./sider";
import { ThemedHeader as DefaultHeader } from "./header";

export const ThemedLayout: React.FC<RefineThemedLayoutProps> = ({
    Sider,
    Header,
    Title,
    Footer,
    OffLayoutArea,
    children,
}) => {
    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

    return (
        <Box sx={{ display: "flex" }}>
            <SiderToRender Title={Title} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    overflow: "auto",
                }}
            >
                <HeaderToRender />
                <Box
                    component="main"
                    sx={(theme) => ({
                        padding: theme.spacing.sm,
                    })}
                >
                    {children}
                </Box>
                {Footer && <Footer />}
            </Box>
            {OffLayoutArea && <OffLayoutArea />}
        </Box>
    );
};
