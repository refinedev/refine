import React from "react";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";

import type { ExtendButtonBase } from "@mui/material/ButtonBase";
import type { IconButtonTypeMap } from "@mui/material/IconButton";

import { useSiderState } from "@hooks";

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
        siderCollapsed,
        setSiderCollapsed,
        mobileSiderOpen,
        setMobileSiderOpen,
    } = useSiderState();

    return (
        <>
            <HamburgerIcon
                onClick={() => setSiderCollapsed(!siderCollapsed)}
                sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    ...(!siderCollapsed && { display: "none" }),
                }}
            />
            <HamburgerIcon
                onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
                sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    ...(mobileSiderOpen && { display: "none" }),
                }}
            />
        </>
    );
};
