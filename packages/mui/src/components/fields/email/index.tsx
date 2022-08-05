import React, { ReactNode } from "react";

import { RefineFieldEmailProps } from "@pankod/refine-ui-types";
import { Typography, Link, LinkProps } from "@mui/material";

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, LinkProps>;

/**
 * This field is used to display email values. It uses the {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>` }
 * and {@link https://mui.com/material-ui/react-link/#main-content `<Link>`} components from Material UI.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/fields/email} for more details.
 */
export const EmailField: React.FC<EmailFieldProps> = ({ value, ...rest }) => {
    return (
        <Typography variant="body2">
            <Link href={`mailto:${value}`} {...rest}>
                {value}
            </Link>
        </Typography>
    );
};
