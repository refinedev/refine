import React from "react";
import { Typography } from "antd";
import { LinkProps } from "antd/lib/typography/Link";

import { BaseFieldProps } from "@interfaces";

import { fieldContent } from "@definitions";

const { Link } = Typography;

export type FileFieldProps = BaseFieldProps & LinkProps & {
    src?: string;
};

export const FileField: React.FC<FileFieldProps> = ({
    record,
    source,
    title,
    src,
    ...rest
}) => {

    const sourceValue = fieldContent({ record, source })

    const titleValue = fieldContent({ record, source: title }) ?? title

    return (
        <Link title={titleValue} href={fieldContent({ record, source })} {...rest}>
            {titleValue}
        </Link>
    );
};
