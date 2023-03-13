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
    Breadcrumb as ChakraBreadcrumb,
    BreadcrumbProps as ChakraBreadcrumbProps,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { IconHome } from "@tabler/icons";

export type BreadcrumbProps = RefineBreadcrumbProps<ChakraBreadcrumbProps>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
    breadcrumbProps,
    showHome = true,
    hideIcons = false,
    meta,
}) => {
    const routerType = useRouterType();
    const { breadcrumbs } = useBreadcrumb({ meta });
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const { hasDashboard } = useRefineContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    if (breadcrumbs.length === 1) {
        return null;
    }

    const { resources } = useResource();

    const rootRouteResource = matchResourceFromRoute("/", resources);

    return (
        <ChakraBreadcrumb mb="3" {...breadcrumbProps}>
            {showHome && (hasDashboard || rootRouteResource?.found) && (
                <BreadcrumbItem>
                    <ActiveLink to="/">
                        {rootRouteResource?.resource?.meta?.icon ?? (
                            <IconHome size={20} />
                        )}
                    </ActiveLink>
                </BreadcrumbItem>
            )}
            {breadcrumbs.map(({ label, icon, href }) => {
                return (
                    <BreadcrumbItem key={label}>
                        {!hideIcons && icon}
                        {href ? (
                            <BreadcrumbLink
                                ml={2}
                                as={ActiveLink}
                                to={href}
                                href={href}
                            >
                                {label}
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbLink ml={2}>{label}</BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                );
            })}
        </ChakraBreadcrumb>
    );
};
