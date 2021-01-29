import React from "react";
import { Input as AntdInput } from "antd";
import { InputProps } from "antd/lib/input";

export const Input: React.FC<InputProps> = ({ ...rest }) => {
    return <AntdInput {...rest} />;
};
