import React from "react";
import {
    useBreadcrumb,
    useRefineContext,
    useRouterContext,
} from "@pankod/refine-core";

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
    const { Link: RouterLink } = useRouterContext();
    const { hasDashboard } = useRefineContext();

    if (breadcrumbs.length === 1) {
        return null;
    }

    const LinkRouter = (props: LinkProps & { to: string }) => (
        <Link {...props} component={RouterLink} />
    );

    return (
        <MuiBreadcrumbs
            aria-label="breadcrumb"
            sx={{
                paddingY: 2,
                paddingX: 2,
                ...(breadcrumbProps?.sx ?? {}),
            }}
            {...breadcrumbProps}
        >
            {showHome && hasDashboard && (
                <LinkRouter
                    underline="hover"
                    sx={{ display: "flex", alignItems: "center" }}
                    color="inherit"
                    href="/"
                    to="/"
                    {...linkProps}
                >
                    <HomeOutlined />
                </LinkRouter>
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
                            <LinkRouter
                                underline="hover"
                                sx={{ display: "flex", alignItems: "center" }}
                                color="inherit"
                                href={href}
                                to={href}
                                variant="subtitle2"
                                lineHeight={0}
                                {...linkProps}
                            >
                                {label}
                            </LinkRouter>
                        ) : (
                            <Typography variant="subtitle2" fontWeight="bold">
                                {label}
                            </Typography>
                        )}
                    </div>
                );
            })}
        </MuiBreadcrumbs>
    );
};
