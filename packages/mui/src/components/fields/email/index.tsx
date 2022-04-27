import React, { ReactNode } from "react";

import { Typography, Link, LinkProps } from "@mui/material";

import { FieldProps } from "src/interfaces/field";

export type EmailFieldProps = FieldProps<ReactNode> & LinkProps;

/**
 * This field is used to display email values. It uses the {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>` }
 * and {@link https://mui.com/material-ui/react-link/#main-content `<Link>`} components from Material UI.
 *
 */
export const EmailField: React.FC<EmailFieldProps> = ({ value, ...rest }) => {
    return (
        <Typography>
            <Link href={`mailto:${value}`} {...rest}>
                {value}
            </Link>
        </Typography>
    );
};
