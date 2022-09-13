import React from "react";

import { RefineFieldFileProps } from "@pankod/refine-ui-types";
import { TextProps } from "@mantine/core";
import { UrlField } from "@components";

export type FileFieldProps = RefineFieldFileProps<TextProps>;
/**
 * This field is used to display email values. It uses the {@link https://mantine.dev/core/text/  `<Text>` }
 * and {@link https://mantine.dev/core/anchor/<Anchor>`} components from Mantine.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/fields/file} for more details.
 */
export const FileField: React.FC<FileFieldProps> = ({
    title,
    src,
    ...rest
}) => {
    return (
        <UrlField value={src} {...rest}>
            {title ?? src}
        </UrlField>
    );
};
