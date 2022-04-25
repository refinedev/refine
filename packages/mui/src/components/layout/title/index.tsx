import React from "react";

import { useRouterContext, TitleProps } from "@pankod/refine-core";

import logo from "../../../assets/images/refine.svg";
import logoCollapsed from "../../../assets/images/refine-collapsed.svg";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Link to="/" href="/">
            {collapsed ? (
                <img src={logoCollapsed} alt="Refine" width={28} height={28} />
            ) : (
                <img src={logo} alt="Refine" width={150} />
            )}
        </Link>
    );
};
