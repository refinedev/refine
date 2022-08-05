import React from "react";
import {
    useBreadcrumb,
    useRefineContext,
    useRouterContext,
} from "@pankod/refine-core";
import { RefineBreadcrumbProps } from "@pankod/refine-ui-types";

import {
    Breadcrumbs as MuiBreadcrumbs,
    BreadcrumbsProps as MuiBreadcrumbProps,
    Typography,
    Link,
    LinkProps,
    Grid,
} from "@mui/material";

import { HomeOutlined } from "@mui/icons-material";

export type BreadcrumbProps = RefineBreadcrumbProps<MuiBreadcrumbProps>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
    breadcrumbProps,
    showHome = true,
    hideIcons = false,
}) => {
    const { breadcrumbs } = useBreadcrumb();
    const { Link: RouterLink } = useRouterContext();
    const { hasDashboard } = useRefineContext();

    if (breadcrumbs.length === 1) {
        return null;
    }

    const LinkRouter = (props: LinkProps & { to?: string }) => (
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
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    color="inherit"
                    to="/"
                >
                    <HomeOutlined
                        sx={{
                            fontSize: "18px",
                        }}
                    />
                </LinkRouter>
            )}
            {breadcrumbs.map(({ label, icon, href }) => {
                return (
                    <Grid
                        key={label}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            "& .MuiSvgIcon-root": {
                                fontSize: "16px",
                            },
                        }}
                    >
                        {!hideIcons && icon}
                        {href ? (
                            <LinkRouter
                                underline="hover"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "14px",
                                }}
                                color="inherit"
                                to={href}
                                variant="subtitle1"
                                marginLeft={0.5}
                            >
                                {label}
                            </LinkRouter>
                        ) : (
                            <Typography fontSize="14px">{label}</Typography>
                        )}
                    </Grid>
                );
            })}
        </MuiBreadcrumbs>
    );
};
