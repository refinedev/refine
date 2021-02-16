import React from "react";
import { Tag, TagProps } from "antd";

export interface ChipFieldProps extends TagProps {
    record?: any;
    source: string;
}

export const ChipField: React.FC<ChipFieldProps> = ({ record, source, ...rest }) => {
    return <Tag {...rest} >{record ? record?.[source] : source}</Tag>;
};
