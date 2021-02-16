import React from "react";
import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";

import { BaseFieldProps } from "@interfaces";

import { fieldContent } from "@definitions";

const { Text } = Typography;

export type TextFieldProps = BaseFieldProps & TextProps & {}

export const TextField: React.FC<TextFieldProps> = ({
    record,
    source,
    ...rest
}) => {
    return (
        <Text {...rest}>{fieldContent({ record, source })}</Text>
    );
};
