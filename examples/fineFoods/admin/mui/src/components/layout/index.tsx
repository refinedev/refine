import { useState } from "react";
import { LayoutProps } from "@pankod/refine-core";
import { Box, CssBaseline } from "@pankod/refine-mui";

import { Header } from "./header";
import { Sider } from "./sider";
import { Content } from "./content";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [opened, setOpened] = useState(false);

    const drawerWidth = () => {
        if (collapsed) return 64;
        return 256;
    };

    return (
        <Box sx={{ display: "flex" }}>
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
                drawerWidth={drawerWidth()}
            />
            <Content drawerWidth={drawerWidth()}>{children}</Content>
        </Box>
    );
};
