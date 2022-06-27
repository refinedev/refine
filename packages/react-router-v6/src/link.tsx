import React from "react";
import { Link } from "react-router-dom";

import { MappedLinkProps } from "./index";

export const MappedLink: React.FC<MappedLinkProps> = ({
    href,
    children,
    ...props
}) => {
    return (
        <Link to={href} {...props}>
            {children}
        </Link>
    );
};
