import React from "react";
import { Input } from "antd";
import { TextAreaProps } from "antd/lib/input";

export const MarkdownInput: React.FC<TextAreaProps> = ({ ...rest }) => {
    return <Input.TextArea {...rest} />;
};
