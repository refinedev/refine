import React from "react";
import { Typography } from "antd";
import { LinkProps } from "antd/lib/typography/Link";

import { renderFieldRecord } from "@definitions";
import { BaseFieldProps } from "../../../interfaces/field";

const { Link } = Typography;

export type UrlFieldProps = BaseFieldProps & LinkProps;

export const UrlField: React.FC<UrlFieldProps> = ({
    value,
    record,
    renderRecordKey,
    ...rest
}) => {
    return (
        <Link {...rest}>
            {renderFieldRecord({
                value,
                record,
                renderRecordKey,
            })}
        </Link>
    );
};
