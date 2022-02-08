import React, { ReactNode } from "react";
import { Tag, TagProps } from "antd";

import { FieldProps } from "../../../interfaces";

export type TagFieldProps = FieldProps<ReactNode> & TagProps;

/**
 * This field lets you display a value in a tag. It uses Ant Design's {@link https://ant.design/components/tag/ `<Tag>`} component.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/tag} for more details.
 */
export const TagField: React.FC<TagFieldProps> = ({ value, ...rest }) => {
    return <Tag {...rest}>{value?.toString()}</Tag>;
};
