import React from "react";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";

import type { ExtendButtonBase } from "@mui/material/ButtonBase";
import type { IconButtonTypeMap } from "@mui/material/IconButton";

import { useSiderVisible } from "@hooks";

const HamburgerIcon: ExtendButtonBase<IconButtonTypeMap<{}, "button">> = (
    props: React.PropsWithChildren,
) => (
    <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        {...props}
    >
        <Menu />
    </IconButton>
);

export const HamburgerMenu: React.FC = () => {
    const {
        siderVisible,
        setSiderVisible,
        drawerSiderVisible,
        setDrawerSiderVisible,
    } = useSiderVisible();

    return (
        <>
            <HamburgerIcon
                onClick={() => setDrawerSiderVisible?.(!drawerSiderVisible)}
                sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    ...(drawerSiderVisible && { display: "none" }),
                }}
            />
            <HamburgerIcon
                onClick={() => setSiderVisible?.(!siderVisible)}
                sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    ...(siderVisible && { display: "none" }),
                }}
            />
        </>
    );
};
