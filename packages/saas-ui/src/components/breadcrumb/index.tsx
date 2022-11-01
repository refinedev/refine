import React from "react";
import {
    useBreadcrumb,
    useRefineContext,
    useRouterContext,
} from "@pankod/refine-core";
import { RefineBreadcrumbProps } from "@pankod/refine-ui-types";

import {
    Text,
    Breadcrumb as ChakraBreadcrumb,
    BreadcrumbProps as ChakraBreadCrumbProps,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbItem,
} from "@chakra-ui/react";
import { IconHome } from "@tabler/icons";

export type BreadcrumbProps = RefineBreadcrumbProps<ChakraBreadCrumbProps>;

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
        <ChakraBreadcrumb aria-label="breadcrumb" {...breadcrumbProps}>
            {showHome && hasDashboard && (
                <BreadcrumbLink as={Link} color="muted" to="/">
                    <IconHome size={18} />
                </BreadcrumbLink>
            )}
            {breadcrumbs.map(({ label, icon, href }) => {
                return (
                    <BreadcrumbItem key={label} spacing={4} alignItems="center">
                        {!hideIcons && icon}
                        {href ? (
                            <BreadcrumbLink
                                as={Link}
                                color="muted"
                                to={href}
                                size="sm"
                            >
                                {label}
                            </BreadcrumbLink>
                        ) : (
                            <Text color="muted" size="sm">
                                {label}
                            </Text>
                        )}
                    </BreadcrumbItem>
                );
            })}
        </ChakraBreadcrumb>
    );
};
