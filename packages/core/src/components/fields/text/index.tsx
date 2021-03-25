import React from "react";
import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";

import { BaseFieldProps } from "../../../interfaces/field";

import { renderFieldRecord } from "@definitions";

const { Text } = Typography;

export type TextFieldProps = BaseFieldProps & TextProps & {};

export const TextField: React.FC<TextFieldProps> = ({
    value,
    record,
    renderRecordKey,
    ...rest
}) => {
    return (
        <Text {...rest}>
            {renderFieldRecord({ value, record, renderRecordKey })}
        </Text>
    );
};
