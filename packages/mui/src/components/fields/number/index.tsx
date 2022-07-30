import React, { ReactChild } from "react";

import { RefineFieldNumberProps } from "@pankod/refine-ui-types";

import { Typography, TypographyProps } from "@mui/material";

function toLocaleStringSupportsOptions() {
    return !!(
        typeof Intl == "object" &&
        Intl &&
        typeof Intl.NumberFormat == "function"
    );
}
export type NumberFieldProps = RefineFieldNumberProps<
    ReactChild,
    TypographyProps
>;
/**
 * This field is used to display a number formatted according to the browser locale, right aligned. and uses {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl `Intl`} to display date format
 * and Material UI {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>`} component.
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/fields/number} for more details.
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
