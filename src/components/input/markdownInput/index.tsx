import React from "react";
import { Input } from "antd";

export const MarkdownInput: React.FC = ({ ...rest }) => {
    return <Input.TextArea {...rest} />;
};
