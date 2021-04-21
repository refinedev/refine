import React from "react";
import { AbstractTooltipProps } from "antd/lib/tooltip";
import { Tooltip } from "antd";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { FieldProps } from "../../../interfaces";

export type BooleanFieldProps = FieldProps &
    AbstractTooltipProps & {
        valueLabelTrue?: string;
        valueLabelFalse?: string;
        trueIcon?: React.FC | object;
        falseIcon?: React.FC | object;
    };

export const BooleanField: React.FC<BooleanFieldProps> = ({
    value,
    valueLabelTrue = "true",
    valueLabelFalse = "false",
    trueIcon = <CheckOutlined />,
    falseIcon = <CloseOutlined />,
    ...rest
}) => {
    return (
        <Tooltip title={value ? valueLabelTrue : valueLabelFalse} {...rest}>
            {value ? <span>{trueIcon}</span> : <span>{falseIcon}</span>}
        </Tooltip>
    );
};
