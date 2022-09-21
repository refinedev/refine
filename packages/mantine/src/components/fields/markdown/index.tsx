import React from "react";
import { RefineFieldMarkdownProps } from "@pankod/refine-ui-types";
import { RichTextEditor } from "@mantine/rte";

export type MarkdownFieldProps = RefineFieldMarkdownProps<string | undefined>;

export const MarkdownField: React.FC<MarkdownFieldProps> = ({ value = "" }) => {
    return <RichTextEditor value={value} />;
};
