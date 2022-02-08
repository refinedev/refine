import React from "react";
import { AbstractTooltipProps } from "antd/lib/tooltip";
import { Tooltip } from "antd";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { FieldProps } from "../../../interfaces";

export type BooleanFieldProps = FieldProps<unknown> &
    AbstractTooltipProps & {
        valueLabelTrue?: string;
        valueLabelFalse?: string;
        trueIcon?: React.FC | object;
        falseIcon?: React.FC | object;
    };

/**
 * This field is used to display boolean values. It uses the {@link https://ant.design/components/tooltip/#header `<Tooltip>`} values from Ant Design.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/boolean} for more details.
 */
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
