import React, { ReactNode } from "react";

import { RefineFieldTextProps } from "@pankod/refine-ui-types";
import { Typography, TypographyProps } from "@mui/material";

export type TextFieldProps = RefineFieldTextProps<ReactNode, TypographyProps>;

/**
 * This field lets you show basic text. It uses Materail UI {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>`} component.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/fields/text} for more details.
 */
const TextField: React.FC<TextFieldProps> = ({ value, ...rest }) => {
    return (
        <Typography variant="body2" {...rest}>
            {value}
        </Typography>
    );
};

export { TextField as TextFieldComponent };
