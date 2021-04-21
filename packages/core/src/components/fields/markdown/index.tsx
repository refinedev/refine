import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { FieldProps } from "../../../interfaces";

export const MarkdownField: React.FC<FieldProps> = ({ value }) => {
    return <ReactMarkdown plugins={[gfm]}>{value}</ReactMarkdown>;
};
