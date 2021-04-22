import React from "react";
import { Typography } from "antd";
import { LinkProps } from "antd/lib/typography/Link";

import { FieldProps } from "../../../interfaces/field";

const { Link } = Typography;

export type UrlFieldProps = FieldProps<string | undefined> & LinkProps;

export const UrlField: React.FC<UrlFieldProps> = ({
    children,
    value,
    ...rest
}) => {
    return (
        <Link href={value} {...rest}>
            {children ?? value}
        </Link>
    );
};
