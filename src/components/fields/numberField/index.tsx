import React from "react";
import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";

import { BaseFieldProps } from "../../../interfaces/field";

const { Text } = Typography;

function toLocaleStringSupportsOptions() {
    return !!(
        typeof Intl == "object" &&
        Intl &&
        typeof Intl.NumberFormat == "function"
    );
}

export type NumberFieldProps = BaseFieldProps &
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
    console.log("locale ", locale);
    console.log("options ", options);
    return (
        <Text {...rest}>
            {toLocaleStringSupportsOptions()
                ? (value as number).toLocaleString(locale, options)
                : value}
        </Text>
    );
};
