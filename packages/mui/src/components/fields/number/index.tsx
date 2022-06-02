import React, { ReactChild } from "react";

import { Typography, TypographyProps } from "@mui/material";

import { FieldProps } from "src/interfaces/field";

function toLocaleStringSupportsOptions() {
    return !!(
        typeof Intl == "object" &&
        Intl &&
        typeof Intl.NumberFormat == "function"
    );
}

export type NumberFieldProps = FieldProps<ReactChild> &
    TypographyProps & {
        locale?: string | string[];
        options?: Intl.NumberFormatOptions;
    };

/**
 * This field is used to display a number formatted according to the browser locale, right aligned. and uses {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl `Intl`} to display date format.
 *
 */
export const NumberField: React.FC<NumberFieldProps> = ({
    value,
    locale,
    options,
    ...rest
}) => {
    const number = parseFloat(value.toString());

    return (
        <Typography variant="body2" {...rest}>
            {toLocaleStringSupportsOptions()
                ? number.toLocaleString(locale, options)
                : number}
        </Typography>
    );
};
