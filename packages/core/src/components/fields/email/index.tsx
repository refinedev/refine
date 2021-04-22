import React, { ReactNode } from "react";
import { Typography } from "antd";
import { LinkProps } from "antd/lib/typography/Link";

import { FieldProps } from "../../../interfaces";

const { Link } = Typography;

export type EmailFieldProps = FieldProps<ReactNode> & LinkProps;

export const EmailField: React.FC<EmailFieldProps> = ({ value, ...rest }) => {
    return (
        <Link href="mailto:" {...rest}>
            {value}
        </Link>
    );
};
