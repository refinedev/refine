import React, { ReactNode } from "react";

import { Typography, TypographyProps } from "@mui/material";

import { FieldProps } from "src/interfaces/field";

export type TextFieldProps = FieldProps<ReactNode> & TypographyProps;

/**
 * This field lets you show basic text. It uses Materail UI {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>`} component.
 *
 */
const TextField: React.FC<TextFieldProps> = ({ value, ...rest }) => {
    return (
        <Typography variant="body2" {...rest}>
            {value}
        </Typography>
    );
};

export { TextField as TextFieldComponent };
