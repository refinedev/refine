import React from "react";
import { Switch as AntdSwitch } from "antd";
import { SwitchProps } from "antd/lib/switch";

export const BooleanInput: React.FC<SwitchProps & { value?: boolean }> = ({
    value,
    ...rest
}) => {
    return <AntdSwitch checked={value} {...rest} />;
};
