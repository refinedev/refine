import React from "react";

import { RefineFieldFileProps } from "@pankod/refine-ui-types";
import { LinkProps } from "@mui/material";

import { UrlField } from "@components";

export type FileFieldProps = RefineFieldFileProps<LinkProps>;
/**
 * This field is used to display files and  uses Material UI {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>`}  and {@link https://mui.com/material-ui/react-link/#main-content `<Link>`} components.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/fields/file} for more details.
 */
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
