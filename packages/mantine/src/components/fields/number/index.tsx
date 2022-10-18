import React from "react";

import { RefineFieldNumberProps } from "@pankod/refine-ui-types";
import { Text, TextProps } from "@mantine/core";

function toLocaleStringSupportsOptions() {
    return !!(
        typeof Intl == "object" &&
        Intl &&
        typeof Intl.NumberFormat == "function"
    );
}
export type NumberFieldProps = RefineFieldNumberProps<TextProps>;
/**
 * This field is used to display a number formatted according to the browser locale, right aligned. and uses {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl `Intl`} to display date format
 * and Mantine {@link https://mantine.dev/core/text/  `<Text>`} component.
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/fields/number/} for more details.
 */
export const NumberField: React.FC<NumberFieldProps> = ({
    value,
    locale,
    options,
    ...rest
}) => {
    const number = parseFloat(value.toString());

    return (
        <Text {...rest}>
            {toLocaleStringSupportsOptions()
                ? number.toLocaleString(locale, options)
                : number}
        </Text>
    );
};
