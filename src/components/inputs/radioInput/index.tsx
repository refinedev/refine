import React from "react";
import { Radio as AntdRadio } from "antd";
import { RadioProps, RadioGroupProps } from "antd/lib/radio";

export const RadioInput: React.FC<RadioProps> = ({ ...rest }) => {
    return <AntdRadio {...rest} />;
};

export const RadioGroupInput: React.FC<RadioGroupProps> = ({ ...rest }) => {
    return <AntdRadio.Group {...rest} />;
};
