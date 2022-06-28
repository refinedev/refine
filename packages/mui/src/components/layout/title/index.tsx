import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@mui/material";

import logo from "../../../assets/images/refine.svg";
import logoCollapsed from "../../../assets/images/refine-collapsed.svg";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Button fullWidth variant="text" disableRipple>
            <Link to="/">
                {collapsed ? (
                    <img src={logoCollapsed} alt="Refine" width="28px" />
                ) : (
                    <img src={logo} alt="Refine" width="140px" />
                )}
            </Link>
        </Button>
    );
};
