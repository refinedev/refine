import React from "react";
import { Tag, TagProps } from "antd";

import { BaseFieldProps } from "@interfaces";

import { renderFieldRecord } from "@definitions";

export type ChipFieldProps = BaseFieldProps & TagProps & {};

export const ChipField: React.FC<ChipFieldProps> = ({
    value,
    record,
    renderRecordKey,
    ...rest
}) => {
    return (
        <Tag {...rest}>
            {renderFieldRecord({ value, record, renderRecordKey })}
        </Tag>
    );
};
