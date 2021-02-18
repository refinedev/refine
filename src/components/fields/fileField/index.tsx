import React from "react";
import { Typography } from "antd";
import { LinkProps } from "antd/lib/typography/Link";

import { BaseFieldProps } from "../../../interfaces/field";

import { renderFieldRecord } from "@definitions";

const { Link } = Typography;

export type FileFieldProps = BaseFieldProps & LinkProps & {
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

    const url = renderFieldRecord({value, record, renderRecordKey })

    const titleValue = renderFieldRecord({value: title, record, renderRecordKey: title})

    return (
        <Link title={titleValue} href={url} {...rest}>
            {titleValue}
        </Link>
    );
};
