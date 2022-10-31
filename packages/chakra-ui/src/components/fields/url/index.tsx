import React from "react";

import { RefineFieldUrlProps } from "@pankod/refine-ui-types";
import { Link, LinkProps } from "@chakra-ui/react";

export type UrlFieldProps = RefineFieldUrlProps<
    string | undefined,
    LinkProps,
    {
        title?: string;
    }
>;

/**
 * This field is used to display email values. It uses the {@link https://chakra-ui.com/docs/components/text  `<Text>` } component from Chakra UI.
 * You can pass a URL in its `value` property and you can show a text in its place by passing any `children`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/fields/url} for more details.
 */
export const UrlField: React.FC<UrlFieldProps> = ({
    children,
    value,
    title,
    ...rest
}) => {
    return (
        <Link href={value} title={title} {...rest}>
            {children ?? value}
        </Link>
    );
};
