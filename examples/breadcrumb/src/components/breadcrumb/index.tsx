import React from "react";
import routerProvider from "@pankod/refine-react-router-v6";
import { useBreadcrumb, useRefineContext } from "@pankod/refine-core";
import { Breadcrumb as AntdBreadcrumb, Icons } from "@pankod/refine-antd";

const { Link } = routerProvider;
const { HomeOutlined } = Icons;

export const Breadcrumb: React.FC = () => {
    const { breadcrumbs } = useBreadcrumb();
    const { hasDashboard } = useRefineContext();

    return (
        <AntdBreadcrumb>
            {hasDashboard && (
                <AntdBreadcrumb.Item>
                    <Link to="/">
                        <HomeOutlined />
                    </Link>
                </AntdBreadcrumb.Item>
            )}
            {breadcrumbs.map((breadcrumb, index) => {
                return (
                    <AntdBreadcrumb.Item key={index}>
                        {breadcrumb.icon}
                        {breadcrumb.to ? (
                            <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
                        ) : (
                            breadcrumb.label
                        )}
                    </AntdBreadcrumb.Item>
                );
            })}
        </AntdBreadcrumb>
    );
};
