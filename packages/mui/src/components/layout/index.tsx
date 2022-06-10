import React from "react";
import { LayoutProps } from "@pankod/refine-core";

import { Box } from "@mui/material";

import { Sider as DefaultSider } from "./sider";

export const Layout: React.FC<LayoutProps> = ({
    Sider,
    Header,
    Footer,
    OffLayoutArea,
    children,
}) => {
    const SiderToRender = Sider ?? DefaultSider;

    return (
        <Box display="flex" flexDirection="row">
            <SiderToRender />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: "100vh",
                    transition:
                        "margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }}
            >
                {Header && <Header />}
                <Box
                    component="main"
                    sx={{
                        p: { xs: 1, md: 2, lg: 3 },
                        flexGrow: 1,
                        bgcolor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
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
