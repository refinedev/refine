import React from "react";
import { Box } from "@mui/material";

import { ThemedLayoutContextProvider } from "../../contexts/themedLayoutContext";
import { ThemedSiderV2 as DefaultSider } from "./sider";
import { ThemedHeaderV2 as DefaultHeader } from "./header";
import { RefineThemedLayoutV2Props } from "./types";

export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
    Sider,
    Header,
    Title,
    Footer,
    OffLayoutArea,
    children,
    initialSiderCollapsed,
}) => {
    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

    return (
        <ThemedLayoutContextProvider
            initialSiderCollapsed={initialSiderCollapsed}
        >
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
                            bgcolor: (theme) =>
                                theme.palette.background.default,
                        }}
                    >
                        {children}
                    </Box>
                    {Footer && <Footer />}
                </Box>
                {OffLayoutArea && <OffLayoutArea />}
            </Box>
        </ThemedLayoutContextProvider>
    );
};
