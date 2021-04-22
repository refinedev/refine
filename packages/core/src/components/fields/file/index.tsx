import React from "react";
import { LinkProps } from "antd/lib/typography/Link";

import { UrlField } from "@components";

export type FileFieldProps<T> = LinkProps & {
    srcKey: string;
    titleKey: string;
    value: T[] | T;
};

export const FileField = <T extends Record<string, string>>({
    value,
    titleKey,
    srcKey,
    ...rest
}: FileFieldProps<T>) => {
    if (Array.isArray(value)) {
        return (
            <ul>
                {value.map((file, index) => {
                    return (
                        <li key={index}>
                            <UrlField
                                value={file[srcKey]}
                                title={file[titleKey]}
                                {...rest}
                            >
                                {titleKey ? file[titleKey] : file[srcKey]}
                            </UrlField>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <UrlField value={value[srcKey]} title={value[titleKey]} {...rest}>
            {titleKey ? titleKey : srcKey}
        </UrlField>
    );
};
