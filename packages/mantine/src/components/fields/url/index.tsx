import React from "react";

import { RefineFieldUrlProps } from "@pankod/refine-ui-types";
import { Text, TextProps, Anchor, AnchorProps } from "@mantine/core";

export type UrlFieldProps = RefineFieldUrlProps<
    string | undefined,
    AnchorProps & TextProps
>;

/**
 * This field is used to display email values. It uses the {@link https://mantine.dev/core/text/  `<Text>` }
 * and {@link https://mantine.dev/core/anchor/ <Anchor>`} components from Mantine.
 * You can pass a URL in its `value` property and you can show a text in its place by passing any `children`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/fields/url} for more details.
 */
export const UrlField: React.FC<UrlFieldProps> = ({
    children,
    value,
    ...rest
}) => {
    return (
        <Text variant="text">
            <Anchor href={value} {...rest}>
                {children ?? value}
            </Anchor>
        </Text>
    );
};
