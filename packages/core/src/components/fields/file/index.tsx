import React from "react";
import { LinkProps } from "antd/lib/typography/Link";

import { FieldProps } from "../../../interfaces";

import { UrlField } from "@components";

export type FileFieldProps = FieldProps &
    LinkProps & {
        src: string;
        title: string;
    };

export const FileField: React.FC<FileFieldProps> = ({
    value,
    title,
    src,
    ...rest
}) => {
    if (Array.isArray(value)) {
        return (
            <ul>
                {value.map((file, index) => {
                    return (
                        <li key={index}>
                            <UrlField
                                value={file[src]}
                                title={file[title]}
                                {...rest}
                            >
                                {title ? file[title] : file[src]}
                            </UrlField>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <UrlField value={value[src]} title={value[title]} {...rest}>
            {title ? title : src}
        </UrlField>
    );
};
