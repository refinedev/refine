import { useState } from "react";
import { LayoutProps } from "@pankod/refine-core";
import { Box, CssBaseline, Toolbar } from "@pankod/refine-mui";

import { Header } from "./header";
import { Sider } from "./sider";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [opened, setOpened] = useState(false);

    const drawerWidth = () => {
        if (collapsed) return 64;
        return 256;
    };

    return (
        <Box>
            <CssBaseline />
            <Header
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setOpened={setOpened}
                drawerWidth={drawerWidth()}
            />
            <Sider
                opened={opened}
                setOpened={setOpened}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                drawerWidth={drawerWidth()}
            />
            <Box
                component="main"
                sx={{
                    p: 3,
                    minHeight: "100vh",
                    marginLeft: { sm: `${drawerWidth()}px` },
                    transition:
                        "margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};
