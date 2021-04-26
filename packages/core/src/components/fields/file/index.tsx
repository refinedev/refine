import React from "react";
import { LinkProps } from "antd/lib/typography/Link";

import { UrlField } from "@components";

export type FileFieldProps = LinkProps & {
    title?: string;
    src: string;
};

export const FileField = ({ title, src, ...rest }: FileFieldProps) => {
    return (
        <UrlField value={src} title={title} {...rest}>
            {title ?? src}
        </UrlField>
    );
};
