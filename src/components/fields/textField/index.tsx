import React from "react";
import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";

const { Text } = Typography;

export interface TextFieldProps extends TextProps {
    record?: any;
    source: string | boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
    record,
    source,
    ...rest
}) => {
    const stringSource = source.toString();
    return (
        <Text {...rest}>{record ? record?.[stringSource] : stringSource}</Text>
    );
};
