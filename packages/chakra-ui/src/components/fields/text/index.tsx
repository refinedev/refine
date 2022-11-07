import React, { ReactNode } from "react";

import { RefineFieldTextProps } from "@pankod/refine-ui-types";
import { Text, TextProps } from "@chakra-ui/react";

export type TextFieldProps = RefineFieldTextProps<ReactNode, TextProps>;

/**
 * This field lets you show basic text. It uses Chakra UI {@link https://chakra-ui.com/docs/components/text  `<Text>`} component.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/fields/text} for more details.
 */
export const TextField: React.FC<TextFieldProps> = ({ value, ...rest }) => {
    return <Text {...rest}>{value}</Text>;
};
