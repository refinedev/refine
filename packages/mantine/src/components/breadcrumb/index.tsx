import React from "react";
import {
    useBreadcrumb,
    useRefineContext,
    useRouterContext,
} from "@pankod/refine-core";
import { RefineBreadcrumbProps } from "@pankod/refine-ui-types";

import {
    Text,
    Breadcrumbs as MantineBreadcrumbs,
    BreadcrumbsProps as MantineBreadcrumbProps,
    Anchor,
    AnchorProps,
    Box,
} from "@mantine/core";
import { Home } from "tabler-icons-react";

export type BreadcrumbProps = RefineBreadcrumbProps<MantineBreadcrumbProps>;

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

    const LinkRouter = (props: AnchorProps & { to?: string }) => (
        <Anchor {...props} component={RouterLink} />
    );

    return (
        <MantineBreadcrumbs
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
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    color="inherit"
                    to="/"
                >
                    <Home size={18} />
                </LinkRouter>
            )}
            {breadcrumbs.map(({ label, icon, href }) => {
                return (
                    <Box
                        key={label}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {!hideIcons && icon}
                        {href ? (
                            <LinkRouter
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                color="inherit"
                                to={href}
                                ml={0.5}
                                size="sm"
                            >
                                {label}
                            </LinkRouter>
                        ) : (
                            <Text size="sm">{label}</Text>
                        )}
                    </Box>
                );
            })}
        </MantineBreadcrumbs>
    );
};
