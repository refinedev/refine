import React from "react";
import { Box } from "@mui/material";

import { ThemedSider as DefaultSider } from "./sider";
import { ThemedHeader as DefaultHeader } from "./header";
import { RefineThemedLayoutProps } from "./types";

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
        <Box display="flex" flexDirection="row">
            <SiderToRender Title={Title} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: "100vh",
                }}
            >
                <HeaderToRender />
                <Box
                    component="main"
                    sx={{
                        p: { xs: 1, md: 2, lg: 3 },
                        flexGrow: 1,
                        bgcolor: (theme) => theme.palette.background.default,
                    }}
                >
                    {children}
                </Box>
                {Footer && <Footer />}
            </Box>
            {OffLayoutArea && <OffLayoutArea />}
        </Box>
    );
};
