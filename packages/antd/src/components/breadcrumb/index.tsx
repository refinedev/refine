import React from "react";
import {
    useBreadcrumb,
    useLink,
    useRefineContext,
    useRouterContext,
    useRouterType,
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
    const routerType = useRouterType();
    const { breadcrumbs } = useBreadcrumb();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const { hasDashboard } = useRefineContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    if (breadcrumbs.length === 1) {
        return null;
    }

    return (
        <AntdBreadcrumb {...breadcrumbProps}>
            {showHome && hasDashboard && (
                <AntdBreadcrumb.Item>
                    <ActiveLink to="/">
                        <HomeOutlined />
                    </ActiveLink>
                </AntdBreadcrumb.Item>
            )}
            {breadcrumbs.map(({ label, icon, href }) => {
                return (
                    <AntdBreadcrumb.Item key={label}>
                        {!hideIcons && icon}
                        {href ? (
                            <ActiveLink to={href}>{label}</ActiveLink>
                        ) : (
                            <span>{label}</span>
                        )}
                    </AntdBreadcrumb.Item>
                );
            })}
        </AntdBreadcrumb>
    );
};
