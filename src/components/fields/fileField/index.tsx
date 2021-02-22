import React from "react";
import { LinkProps } from "antd/lib/typography/Link";

import { BaseFieldProps } from "../../../interfaces/field";
import { renderFieldRecord } from "@definitions";
import { UrlField } from "@components";

export type FileFieldProps = BaseFieldProps &
    LinkProps & {
        src?: string;
    };

export const FileField: React.FC<FileFieldProps> = ({
    record,
    renderRecordKey,
    value,
    title,
    src,
    ...rest
}) => {
    if (Array.isArray(value)) {
        return (
            <ul>
                {value.map((file, index) => {
                    const fileUrl = renderFieldRecord({
                        value: src,
                        record: file,
                        renderRecordKey: src,
                    });
                    const fileTitleValue = renderFieldRecord({
                        value: title,
                        record: file,
                        renderRecordKey: title,
                    });

                    return (
                        <li key={index}>
                            <UrlField
                                value={fileUrl}
                                title={fileTitleValue}
                                {...rest}
                            >
                                {title ? fileTitleValue : fileUrl}
                            </UrlField>
                        </li>
                    );
                })}
            </ul>
        );
    }

    const url = renderFieldRecord({ value, record, renderRecordKey });
    const titleValue = renderFieldRecord({
        value: title,
        record,
        renderRecordKey: title,
    });

    return (
        <UrlField value={url} title={titleValue} {...rest}>
            {title ? titleValue : url}
        </UrlField>
    );
};
