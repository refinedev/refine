import React from "react";
import { Link } from "react-router-dom";

import { WrapperLinkProps } from "./index";

export const WrapperLink: React.FC<WrapperLinkProps> = ({
    children,
    ...props
}) => {
    return (
        <Link to={"href" in props ? props.href : props.to} {...props}>
            {children}
        </Link>
    );
};
