import React, { useState } from "react";
import { Box } from "@mui/material";

import { ThemedSiderV2 as DefaultSider } from "./sider";
import { ThemedHeaderV2 as DefaultHeader } from "./header";
import { RefineThemedLayoutV2Props } from "./types";

export interface IThemedLayoutContext {
    siderVisible?: boolean;
    drawerSiderVisible?: boolean;
    setSiderVisible?: (visible: boolean) => void;
    setDrawerSiderVisible?: (visible: boolean) => void;
}

export const ThemedLayoutContext = React.createContext<IThemedLayoutContext>(
    {},
);

export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
    Sider,
    Header,
    Title,
    Footer,
    OffLayoutArea,
    children,
}) => {
    const [siderVisible, setSiderVisible] = useState(false);
    const [drawerSiderVisible, setDrawerSiderVisible] = useState(true);

    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

    return (
        <ThemedLayoutContext.Provider
            value={{
                siderVisible,
                drawerSiderVisible,
                setSiderVisible,
                setDrawerSiderVisible,
            }}
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
        </ThemedLayoutContext.Provider>
    );
};
