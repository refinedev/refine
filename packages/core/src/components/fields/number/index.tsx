import React from "react";
import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";

import { FieldProps } from "../../../interfaces";

const { Text } = Typography;

function toLocaleStringSupportsOptions() {
    return !!(
        typeof Intl == "object" &&
        Intl &&
        typeof Intl.NumberFormat == "function"
    );
}

export type NumberFieldProps = FieldProps &
    TextProps & {
        locale?: string | string[];
        options?: Intl.NumberFormatOptions;
    };

export const NumberField: React.FC<NumberFieldProps> = ({
    value,
    locale,
    options,
    ...rest
}) => {
    const number = parseFloat(value);

    return (
        <Text {...rest}>
            {toLocaleStringSupportsOptions()
                ? number.toLocaleString(locale, options)
                : number}
        </Text>
    );
};
