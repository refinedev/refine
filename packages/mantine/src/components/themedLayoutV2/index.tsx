import React from "react";
import { Box } from "@mantine/core";

import { RefineThemedLayoutV2Props } from "./types";
import { ThemedSiderV2 as DefaultSider } from "./sider";
import { ThemedHeaderV2 as DefaultHeader } from "./header";

export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
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
