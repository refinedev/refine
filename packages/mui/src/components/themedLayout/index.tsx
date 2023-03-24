import React, { useState } from "react";
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
    const [isSiderOpen, setIsSiderOpen] = useState(true);

    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

    return (
        <Box display="flex" flexDirection="row">
            <SiderToRender
                Title={Title}
                isSiderOpen={isSiderOpen}
                onToggleSiderClick={(isOpen) => setIsSiderOpen(Boolean(isOpen))}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: "100vh",
                }}
            >
                <HeaderToRender
                    isSiderOpen={isSiderOpen}
                    onToggleSiderClick={() => setIsSiderOpen((prev) => !prev)}
                />
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
