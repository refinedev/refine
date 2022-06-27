import React from "react";
import { Link } from "react-router-dom";

import { WrapperLinkProps } from "./index";

export const WrapperLink: React.FC<WrapperLinkProps> = ({
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
