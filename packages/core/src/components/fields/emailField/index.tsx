import React from "react";
import { Typography } from "antd";
import { LinkProps } from "antd/lib/typography/Link";

import { BaseFieldProps } from "../../../interfaces/field";

import { renderFieldRecord } from "@definitions";

const { Link } = Typography;

export type EmailFieldProps = BaseFieldProps & LinkProps & {};

export const EmailField: React.FC<EmailFieldProps> = ({
    value,
    record,
    renderRecordKey,
    ...rest
}) => {
    return (
        <Link href="mailto:" {...rest}>
            {renderFieldRecord({ value, record, renderRecordKey })}
        </Link>
    );
};
