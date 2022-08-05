import React from "react";
import { RefineFieldMarkdownProps } from "@pankod/refine-ui-types";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

/**
 * This field lets you display markdown content. It supports {@link https://github.github.com/gfm/ GitHub Flavored Markdown}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/markdown} for more details.
 */
export const MarkdownField: React.FC<
    RefineFieldMarkdownProps<string | undefined>
> = ({ value = "" }) => {
    return <ReactMarkdown plugins={[gfm]}>{value}</ReactMarkdown>;
};
