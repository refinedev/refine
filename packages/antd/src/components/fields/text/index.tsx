import React, { ReactNode } from "react";
import { RefineFieldTextProps } from "@pankod/refine-ui-types";
import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";

const { Text } = Typography;

export type TextFieldProps = RefineFieldTextProps<ReactNode, TextProps>;

/**
 * This field lets you show basic text. It uses Ant Design's {@link https://ant.design/components/typography/#Typography.Text `<Typography.Text>`} component.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/text} for more details.
 */
export const TextField: React.FC<TextFieldProps> = ({ value, ...rest }) => {
    return <Text {...rest}>{value}</Text>;
};
