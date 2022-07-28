import React, { ReactNode } from "react";
import { RefineFieldEmailProps } from "@pankod/refine-ui-types";
import { Typography } from "antd";
import { LinkProps } from "antd/lib/typography/Link";

const { Link } = Typography;

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, LinkProps>;

/**
 * This field is used to display email values. It uses the {@link https://ant.design/components/typography/#FAQ `<Link>`} component
 * of {@link https://ant.design/components/typography `<Typography>`} from Ant Design.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/email} for more details.
 */
export const EmailField: React.FC<EmailFieldProps> = ({ value, ...rest }) => {
    return (
        <Link href={`mailto:${value}`} {...rest}>
            {value}
        </Link>
    );
};
