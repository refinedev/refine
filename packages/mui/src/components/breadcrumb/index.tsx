import React from "react";
import { useBreadcrumb, useRefineContext } from "@pankod/refine-core";
import {
    Breadcrumbs as MuiBreadcrumbs,
    BreadcrumbsProps as MuiBreadcrumbProps,
    Typography,
    Link,
    LinkProps,
} from "@mui/material";

import { HomeOutlined } from "@mui/icons-material";

export type BreadcrumbProps = {
    breadcrumbProps?: MuiBreadcrumbProps;
    linkProps?: LinkProps;
    showHome?: boolean;
    hideIcons?: boolean;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
    breadcrumbProps,
    linkProps,
    showHome = true,
    hideIcons = false,
}) => {
    const { breadcrumbs } = useBreadcrumb();
    const { hasDashboard } = useRefineContext();

    if (breadcrumbs.length === 1) {
        return null;
    }

    return (
        <MuiBreadcrumbs {...breadcrumbProps} aria-label="breadcrumb">
            {showHome && hasDashboard && (
                <Link
                    underline="hover"
                    {...linkProps}
                    sx={{ display: "flex", alignItems: "center" }}
                    color="inherit"
                    href="/"
                >
                    <HomeOutlined />
                </Link>
            )}
            {breadcrumbs.map(({ label, icon, href }) => {
                return href ? (
                    <Link
                        key={label}
                        underline="hover"
                        {...linkProps}
                        sx={{ display: "flex", alignItems: "center" }}
                        color="inherit"
                        href={href}
                    >
                        {!hideIcons && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {icon}
                            </div>
                        )}
                        <Typography variant="subtitle2" lineHeight={0}>
                            {label}
                        </Typography>
                    </Link>
                ) : (
                    <Typography
                        key={label}
                        variant="subtitle2"
                        fontWeight="bold"
                        lineHeight={0}
                    >
                        {label}
                    </Typography>
                );
            })}
        </MuiBreadcrumbs>
    );
};
