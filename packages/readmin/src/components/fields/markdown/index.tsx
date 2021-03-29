import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { BaseFieldProps } from "../../../interfaces/field";

import { renderFieldRecord } from "@definitions";

export const MarkdownField: React.FC<BaseFieldProps> = ({
    value,
    record,
    renderRecordKey,
}) => {
    const recordValue = renderFieldRecord({ value, record, renderRecordKey });

    return <ReactMarkdown plugins={[gfm]}>{recordValue}</ReactMarkdown>;
};
