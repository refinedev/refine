import React from "react";
import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";

import { renderFieldRecord } from "@definitions";

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
    record,
    renderRecordKey,
    locale,
    options,
    ...rest
}) => {
    const recordValue = renderFieldRecord({ value, record, renderRecordKey });
    const number = parseFloat(recordValue);

    return (
        <Text {...rest}>
            {toLocaleStringSupportsOptions()
                ? number.toLocaleString(locale, options)
                : number}
        </Text>
    );
};
