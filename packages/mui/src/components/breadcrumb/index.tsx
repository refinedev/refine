import React from "react";
import {
    matchResourceFromRoute,
    useBreadcrumb,
    useLink,
    useRefineContext,
    useResource,
    useRouterContext,
    useRouterType,
} from "@refinedev/core";
import { RefineBreadcrumbProps } from "@refinedev/ui-types";

import {
    Breadcrumbs,
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
    meta,
}) => {
    const { breadcrumbs } = useBreadcrumb({ meta });
    const routerType = useRouterType();
    const NewLink = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : NewLink;

    const { hasDashboard } = useRefineContext();

    const { resources } = useResource();

    const rootRouteResource = matchResourceFromRoute("/", resources);

    if (breadcrumbs.length === 1) {
        return null;
    }

    const LinkRouter = (props: LinkProps & { to?: string }) => (
        <Link {...props} component={ActiveLink} />
    );

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
                paddingY: 2,
                paddingX: 2,
                ...(breadcrumbProps?.sx ?? {}),
            }}
            {...breadcrumbProps}
        >
            {showHome && (hasDashboard || rootRouteResource.found) && (
                <LinkRouter
                    underline="hover"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    color="inherit"
                    to="/"
                >
                    {rootRouteResource?.resource?.meta?.icon ?? (
                        <HomeOutlined
                            sx={{
                                fontSize: "18px",
                            }}
                        />
                    )}
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
        </Breadcrumbs>
    );
};
