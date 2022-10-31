import React, { ReactNode } from "react";

import { RefineFieldTagProps } from "@pankod/refine-ui-types";
import { Tag, TagProps } from "@chakra-ui/react";

export type TagFieldProps = RefineFieldTagProps<ReactNode, TagProps>;

/**
 * This field lets you display a value in a tag. It uses Chakra UI {@link https://chakra-ui.com/docs/components/tag `<Tag>`} component.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/fields/tag} for more details.
 */
export const TagField: React.FC<TagFieldProps> = ({ value, ...rest }) => {
    return <Tag {...rest}>{value?.toString()}</Tag>;
};
