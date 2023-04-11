import React from "react";
import { Box } from "@mui/material";

import { ThemedLayoutContextProvider } from "@contexts";
import { useSiderVisible } from "@hooks";
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

    // TODO: It's a temporary solution for `ThemedLayoutContext`. After removing `onToggleSiderClick` it should be reverted.
    let __Internal__HasHeaderWithThemedContext = false;
    if ((HeaderToRender as any).__Internal__HasHeaderWithThemedContext) {
        __Internal__HasHeaderWithThemedContext = true;
    }

    const RenderHeader: React.FC<{}> = () => {
        const { drawerSiderVisible, setDrawerSiderVisible } = useSiderVisible();

        return (
            <HeaderToRender
                onToggleSiderClick={() => {
                    setDrawerSiderVisible?.(!drawerSiderVisible);
                }}
            />
        );
    };

    return (
        <ThemedLayoutContextProvider>
            <Box display="flex" flexDirection="row">
                <SiderToRender
                    Title={Title}
                    __Internal__HasHeaderWithThemedContext={
                        __Internal__HasHeaderWithThemedContext
                    }
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        minHeight: "100vh",
                    }}
                >
                    <RenderHeader />
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
