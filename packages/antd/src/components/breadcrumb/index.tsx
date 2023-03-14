import React from "react";
import {
    useBreadcrumb,
    useLink,
    useRefineContext,
    useRouterContext,
    useRouterType,
    useResource,
    matchResourceFromRoute,
} from "@refinedev/core";
import { RefineBreadcrumbProps } from "@refinedev/ui-types";

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
    meta,
}) => {
    const routerType = useRouterType();
    const { breadcrumbs } = useBreadcrumb({
        meta,
    });
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const { hasDashboard } = useRefineContext();

    const { resources } = useResource();

    const rootRouteResource = matchResourceFromRoute("/", resources);

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    if (breadcrumbs.length === 1) {
        return null;
    }

    return (
        <AntdBreadcrumb {...breadcrumbProps}>
            {showHome && (hasDashboard || rootRouteResource.found) && (
                <AntdBreadcrumb.Item>
                    <ActiveLink to="/">
                        {rootRouteResource?.resource?.meta?.icon ?? (
                            <HomeOutlined />
                        )}
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
