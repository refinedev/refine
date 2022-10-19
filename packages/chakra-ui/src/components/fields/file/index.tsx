import React from "react";

import { RefineFieldFileProps } from "@pankod/refine-ui-types";
import { TextProps } from "@mantine/core";
// import { UrlField } from "@components";

export type FileFieldProps = RefineFieldFileProps<TextProps>;

export const FileField: React.FC<FileFieldProps> = ({
    title,
    src,
    ...rest
}) => {
    return null;

    // return (
    //     <UrlField value={src} title={title} {...rest}>
    //         {title ?? src}
    //     </UrlField>
    // );
};
