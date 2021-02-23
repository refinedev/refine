import React from "react";
import { Tag, TagProps } from "antd";

import { BaseFieldProps } from "../../../interfaces/field";

import { renderFieldRecord } from "@definitions";

export type TagFieldProps = BaseFieldProps & TagProps & {};

export const TagField: React.FC<TagFieldProps> = ({
    value,
    record,
    renderRecordKey,
    ...rest
}) => {
    return (
        <Tag {...rest}>
            {`${renderFieldRecord({ value, record, renderRecordKey })}`}
        </Tag>
    );
};
