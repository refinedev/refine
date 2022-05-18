import React from "react";

import { useRouterContext, TitleProps } from "@pankod/refine-core";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Link to="/" href="/">
            {collapsed ? (
                <img
                    src={"images/refine-collapsed.svg"}
                    alt="Refine"
                    width="100%"
                />
            ) : (
                <img src={"images/refine.svg"} alt="Refine" width="100%" />
            )}
        </Link>
    );
};
