import React from "react";
import { Checkbox as AntdCheckbox } from "antd";
import { CheckboxProps, CheckboxGroupProps } from "antd/lib/checkbox";

export const CheckboxInput: React.FC<CheckboxProps> = ({ ...rest }) => {
    return <AntdCheckbox {...rest} />;
};

export const CheckboxGroupInput: React.FC<CheckboxGroupProps> = ({
    ...rest
}) => {
    return <AntdCheckbox.Group {...rest} />;
};
