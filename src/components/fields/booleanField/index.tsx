import React from "react";
import { TextProps } from "antd/lib/typography/Text";
import { Typography, Tooltip } from "antd";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { BaseFieldProps } from "../../../interfaces/field";

import { renderFieldRecord } from "@definitions";

export type BooleanFieldProps = BaseFieldProps &
    TextProps & {
        valueLabelTrue?: string;
        valueLabelFalse?: string;
        TrueIcon?: React.FC | object;
        FalseIcon?: React.FC | object;
    };

const { Text } = Typography;

export const BooleanField: React.FC<BooleanFieldProps> = ({
    value,
    record,
    renderRecordKey,
    valueLabelTrue = "true",
    valueLabelFalse = "false",
    TrueIcon = <CheckOutlined />,
    FalseIcon = <CloseOutlined />,
    ...rest
}) => {
    if (value === false || value === true) {
        return (
            <Text {...rest}>
                <Tooltip title={value ? valueLabelTrue : valueLabelFalse}>
                    {value === true ? (
                        <span>{TrueIcon}</span>
                    ) : (
                        <span>{FalseIcon}</span>
                    )}
                </Tooltip>
            </Text>
        );
    }

    return (
        <Text {...rest}>
            {renderFieldRecord({ value, record, renderRecordKey }) && ""}
        </Text>
    );
};
