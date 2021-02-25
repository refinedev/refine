import React from "react";
import { Input } from "antd";
import { TextAreaProps } from "antd/lib/input";

export const Markdown: React.FC<TextAreaProps> = ({ ...rest }) => {
    return <Input.TextArea {...rest} />;
};
