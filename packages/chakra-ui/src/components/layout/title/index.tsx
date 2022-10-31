import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Link as ChakraLink } from "@chakra-ui/react";

import logo from "../../../assets/images/refine.svg";
import logoCollapsed from "../../../assets/images/refine-collapsed.svg";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <ChakraLink as={Link} to="/">
            {collapsed ? (
                <img src={logoCollapsed} alt="Refine" />
            ) : (
                <img src={logo} alt="Refine" width="140px" />
            )}
        </ChakraLink>
    );
};
