import React from "react";
import Box from "@mui/material/Box";
import { LayoutProps } from "@pankod/refine-core";

import { CssBaseline, Toolbar, Container } from "@mui/material";
import { Header as DefaultHeader } from "./header";
import { Sider as DefaultSider } from "./sider";

export const Layout: React.FC<LayoutProps> = ({
    children,
    Header,
    Sider,
    Footer,
    OffLayoutArea,
}) => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const HeaderToRender = Header ?? DefaultHeader;
    const SiderToRender = Sider ?? DefaultSider;

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <HeaderToRender
                    drawerOpen={open}
                    toggleDrawer={() => toggleDrawer()}
                />
                <SiderToRender
                    drawerOpen={open}
                    toggleDrawer={() => toggleDrawer()}
                />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    <Container
                        style={{ maxWidth: "100%" }}
                        sx={{
                            padding: {
                                xs: "12px",
                                sm: "12px",
                                md: "24px",
                                lg: "36px",
                                xl: "48px",
                            },
                        }}
                    >
                        {children}
                    </Container>
                    {OffLayoutArea && <OffLayoutArea />}
                </Box>
                {Footer && <Footer />}
            </Box>
        </>
    );
};
