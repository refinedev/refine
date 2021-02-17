import React from "react";
import { Typography } from "antd";
import { LinkProps } from "antd/lib/typography/Link";

import { BaseFieldProps } from "@interfaces";

import { fieldContent } from "@definitions";

const { Link } = Typography

export type EmailFieldProps = BaseFieldProps & LinkProps & {};

export const EmailField: React.FC<EmailFieldProps> = ({
    record,
    source,
    ...rest
}) => {
    return <Link href="mailto:"  {...rest}>{fieldContent({ record, source })}</Link>;
};
