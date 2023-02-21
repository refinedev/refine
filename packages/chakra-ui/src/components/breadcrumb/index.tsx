import React from "react";
import {
    useBreadcrumb,
    useLink,
    useRefineContext,
    useRouterContext,
    useRouterType,
} from "@pankod/refine-core";
import { RefineBreadcrumbProps } from "@pankod/refine-ui-types";
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
    home,
}) => {
    const routerType = useRouterType();
    const { breadcrumbs } = useBreadcrumb();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const { hasDashboard } = useRefineContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    if (breadcrumbs.length === 1) {
        return null;
    }

    const renderHome = () => {
        if (home) {
            return (
                <BreadcrumbItem>
                    <ActiveLink to={home.path ?? "/"}>
                        {typeof home.icon !== "undefined" ? (
                            home.icon
                        ) : (
                            <IconHome size={20} />
                        )}
                    </ActiveLink>
                </BreadcrumbItem>
            );
        }
        return null;
    };

    return (
        <ChakraBreadcrumb mb="3" {...breadcrumbProps}>
            {showHome && hasDashboard && (
                <BreadcrumbItem>
                    <ActiveLink to="/">
                        <IconHome size={20} />
                    </ActiveLink>
                </BreadcrumbItem>
            )}
            {renderHome()}
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
