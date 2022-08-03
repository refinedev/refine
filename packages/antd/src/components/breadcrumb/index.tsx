import React from "react";
import {
    useBreadcrumb,
    useRefineContext,
    useRouterContext,
} from "@pankod/refine-core";
import { RefineBreadcrumbProps } from "@pankod/refine-ui-types";

import {
    Breadcrumb as AntdBreadcrumb,
    BreadcrumbProps as AntdBreadcrumbProps,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";

export type BreadcrumbProps = RefineBreadcrumbProps<AntdBreadcrumbProps>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
    breadcrumbProps,
    showHome = true,
    hideIcons = false,
}) => {
    const { breadcrumbs } = useBreadcrumb();
    const { Link } = useRouterContext();
    const { hasDashboard } = useRefineContext();

    if (breadcrumbs.length === 1) {
        return null;
    }

    return (
        <AntdBreadcrumb {...breadcrumbProps}>
            {showHome && hasDashboard && (
                <AntdBreadcrumb.Item>
                    <Link to="/">
                        <HomeOutlined />
                    </Link>
                </AntdBreadcrumb.Item>
            )}
            {breadcrumbs.map(({ label, icon, href }) => {
                return (
                    <AntdBreadcrumb.Item key={label}>
                        {!hideIcons && icon}
                        {href ? <Link to={href}>{label}</Link> : label}
                    </AntdBreadcrumb.Item>
                );
            })}
        </AntdBreadcrumb>
    );
};
