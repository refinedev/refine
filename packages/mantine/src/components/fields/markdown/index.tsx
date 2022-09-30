import React from "react";

import { RefineFieldMarkdownProps } from "@pankod/refine-ui-types";
import ReactMarkdown from "react-markdown";

import gfm from "remark-gfm";

export type MarkdownFieldProps = RefineFieldMarkdownProps<string | undefined>;

/**
 * This field lets you display markdown content. It supports {@link https://github.github.com/gfm/ GitHub Flavored Markdown}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/fields/markdown} for more details.
 */
export const MarkdownField: React.FC<MarkdownFieldProps> = ({ value = "" }) => {
    return <ReactMarkdown plugins={[gfm]}>{value}</ReactMarkdown>;
};
