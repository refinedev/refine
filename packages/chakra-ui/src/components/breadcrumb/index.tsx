import React from "react";
import {
    useBreadcrumb,
    useRefineContext,
    useRouterContext,
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
}) => {
    const { breadcrumbs } = useBreadcrumb();
    const { Link } = useRouterContext();
    const { hasDashboard } = useRefineContext();

    if (breadcrumbs.length === 1) {
        return null;
    }

    return (
        <ChakraBreadcrumb mb="3" {...breadcrumbProps}>
            {showHome && hasDashboard && (
                <BreadcrumbItem>
                    <Link to="/">
                        <IconHome size={20} />
                    </Link>
                </BreadcrumbItem>
            )}
            {breadcrumbs.map(({ label, icon, href }) => {
                return (
                    <BreadcrumbItem key={label}>
                        {!hideIcons && icon}
                        {href ? (
                            <BreadcrumbLink
                                ml={2}
                                as={Link}
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
