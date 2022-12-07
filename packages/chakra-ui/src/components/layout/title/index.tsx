import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Link as ChakraLink } from "@chakra-ui/react";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <ChakraLink as={Link} to="/">
            {collapsed ? (
                <img
                    src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine-mini.svg"
                    alt="Refine"
                    style={{ maxHeight: "38px" }}
                />
            ) : (
                <img
                    src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
                    alt="Refine"
                    width="140px"
                    style={{ minHeight: "38px" }}
                />
            )}
        </ChakraLink>
    );
};
