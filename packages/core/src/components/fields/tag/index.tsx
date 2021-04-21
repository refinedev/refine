import React from "react";
import { Tag, TagProps } from "antd";

import { FieldProps } from "../../../interfaces";

export type TagFieldProps = FieldProps & TagProps & {};

export const TagField: React.FC<TagFieldProps> = ({ value, ...rest }) => {
    return <Tag {...rest}>{value.toString()}</Tag>;
};
