import React from "react";
import { RefineFieldUrlProps } from "@pankod/refine-ui-types";
import { Typography } from "antd";
import { LinkProps } from "antd/lib/typography/Link";

const { Link } = Typography;

export type UrlFieldProps = RefineFieldUrlProps<string | undefined, LinkProps>;

/**
 * This field lets you embed a link. It uses Ant Design's {@link https://ant.design/components/typography/ `<Typography.Link>`} component.
 * You can pass a URL in its `value` property and you can show a text in its place by passing any `children`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/url} for more details.
 */
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
