import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

function toLocaleStringSupportsOptions() {
    return !!(
        typeof Intl == "object" &&
        Intl &&
        typeof Intl.NumberFormat == "function"
    );
}

import { NumberFieldProps } from "../types";

/**
 * This field is used to display a number formatted according to the browser locale, right aligned. and uses {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl `Intl`} to display date format.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/number} for more details.
 */
export const NumberField: React.FC<NumberFieldProps> = ({
    value,
    locale,
    options,
    ...rest
}) => {
    const number = Number(value);

    return (
        <Text {...rest}>
            {toLocaleStringSupportsOptions()
                ? number.toLocaleString(locale, options)
                : number}
        </Text>
    );
};
