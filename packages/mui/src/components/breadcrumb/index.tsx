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
        <MuiBreadcrumbs
            {...breadcrumbProps}
            aria-label="breadcrumb"
            sx={{
                paddingY: 2,
                paddingX: 2,
                ...(breadcrumbProps?.sx ?? {}),
            }}
        >
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
                return (
                    <div
                        key={label}
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {!hideIcons && icon}
                        {href ? (
                            <Link
                                underline="hover"
                                sx={{ display: "flex", alignItems: "center" }}
                                color="inherit"
                                href={href}
                                {...linkProps}
                            >
                                <Typography variant="subtitle2" lineHeight={0}>
                                    {label}
                                </Typography>
                            </Link>
                        ) : (
                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                lineHeight={0}
                            >
                                {label}
                            </Typography>
                        )}
                    </div>
                );
            })}
        </MuiBreadcrumbs>
    );
};
