import React from "react";

import ReactMarkdown from "react-markdown";

import gfm from "remark-gfm";

import { FieldProps } from "src/interfaces/field";

/**
 * This field lets you display markdown content. It supports {@link https://github.github.com/gfm/ GitHub Flavored Markdown}.
 *
 */
export const MarkdownField: React.FC<FieldProps<string | undefined>> = ({
    value = "",
}) => {
    return <ReactMarkdown plugins={[gfm]}>{value}</ReactMarkdown>;
};
