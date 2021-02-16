import React from "react";
import { Tag, TagProps } from "antd";

import { BaseFieldProps } from "@interfaces";

import { fieldContent } from "@definitions";

export type ChipFieldProps = BaseFieldProps & TagProps & {}

export const ChipField: React.FC<ChipFieldProps> = ({
    record,
    source,
    ...rest
}) => {
    return (
        <Tag {...rest}>{fieldContent({ record, source })}</Tag>
    );
};
