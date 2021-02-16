import React from "react";
import { Tag, TagProps } from "antd";

export interface ChipFieldProps extends TagProps {
    record?: any;
    source: string | boolean;
}

export const ChipField: React.FC<ChipFieldProps> = ({
    record,
    source,
    ...rest
}) => {
    const stringSource = source.toString();
    return (
        <Tag {...rest}>{record ? record?.[stringSource] : stringSource}</Tag>
    );
};
