import React from "react";

import { RefineFieldFileProps } from "@pankod/refine-ui-types";
import { LinkProps } from "@chakra-ui/react";
import { UrlField } from "@components";

export type FileFieldProps = RefineFieldFileProps<LinkProps>;

export const FileField: React.FC<FileFieldProps> = ({
    title,
    src,
    ...rest
}) => {
    return (
        <UrlField value={src} title={title} {...rest}>
            {title ?? src}
        </UrlField>
    );
};
