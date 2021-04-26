import React, { ReactNode } from "react";
import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";

import { FieldProps } from "../../../interfaces/field";

const { Text } = Typography;

export type TextFieldProps = FieldProps<ReactNode> & TextProps;

export const TextField: React.FC<TextFieldProps> = ({ value, ...rest }) => {
    return <Text {...rest}>{value}</Text>;
};
