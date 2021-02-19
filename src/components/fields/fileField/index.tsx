import React from "react";
import { Typography } from "antd";
import { LinkProps } from "antd/lib/typography/Link";

import { BaseFieldProps } from "../../../interfaces/field";

import { renderFieldRecord } from "@definitions";

const { Link } = Typography;

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
                            <Link
                                title={fileTitleValue}
                                href={fileUrl}
                                {...rest}
                            >
                                {title ? fileTitleValue : fileUrl}
                            </Link>
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
        <Link title={titleValue} href={url} {...rest}>
            {title ? titleValue : url}
        </Link>
    );
};
