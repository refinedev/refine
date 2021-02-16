import React from "react";
import { Typography, TypographyProps } from "antd";
import { TextProps } from "antd/lib/typography/Text";

const { Text } = Typography;

export interface TextFieldProps extends TextProps {
    record?: any;
    source: string;
}

export const TextField: React.FC<TextFieldProps> = ({
    record,
    source,
    ...rest
}) => {
    console.log("TextField: ", record, source);
    return <Text {...rest}>{record ? record?.[source] : source}</Text>;
};
