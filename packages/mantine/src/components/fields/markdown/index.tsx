import React from "react";

import { RefineFieldMarkdownProps } from "@pankod/refine-ui-types";
import ReactMarkdown, { ReactMarkdownOptions } from "react-markdown";

import gfm from "remark-gfm";

export type MarkdownFieldProps = RefineFieldMarkdownProps<
    string | undefined,
    Partial<ReactMarkdownOptions>
>;

/**
 * This field lets you display markdown content. It supports {@link https://github.github.com/gfm/ GitHub Flavored Markdown}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/fields/markdown} for more details.
 */
export const MarkdownField: React.FC<MarkdownFieldProps> = ({
    value = "",
    ...rest
}) => {
    return (
        <ReactMarkdown plugins={[gfm]} {...rest}>
            {value}
        </ReactMarkdown>
    );
};
