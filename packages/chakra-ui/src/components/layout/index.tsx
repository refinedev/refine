import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import { Sider as DefaultSider } from "./sider";
import { Header as DefaultHeader } from "./header";
import { RefineLayoutLayoutProps } from "./types";

export const Layout: React.FC<RefineLayoutLayoutProps> = ({
    Sider,
    Header,
    Footer,
    OffLayoutArea,
    children,
}) => {
    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

    const bg = useColorModeValue("gray.100", "gray.900");

    return (
        <Box display="flex" bg={bg}>
            <SiderToRender />
            <Box
                display="flex"
                flexDirection="column"
                flex={1}
                overflow="hidden"
                minH="100vh"
            >
                <HeaderToRender />
                <Box p={[2, 4]}>{children}</Box>
                {Footer && <Footer />}
            </Box>
            {OffLayoutArea && <OffLayoutArea />}
        </Box>
    );
};
