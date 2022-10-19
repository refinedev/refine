import React from "react";
import {
    useBreadcrumb,
    useRefineContext,
    useRouterContext,
} from "@pankod/refine-core";
import { RefineBreadcrumbProps } from "@pankod/refine-ui-types";
import {
    Breadcrumb as ChakraBreadcrumb,
    BreadcrumbItem as ChakraBreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbProps as ChakraBreadcrumbProps,
} from "@chakra-ui/react";

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
        <ChakraBreadcrumb>
            <ChakraBreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </ChakraBreadcrumbItem>

            <ChakraBreadcrumbItem>
                <BreadcrumbLink href="#">Docs</BreadcrumbLink>
            </ChakraBreadcrumbItem>

            <ChakraBreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
            </ChakraBreadcrumbItem>
        </ChakraBreadcrumb>
    );

    // return (
    //     <MantineBreadcrumbs
    //         aria-label="breadcrumb"
    //         styles={{
    //             separator: { marginRight: 8, marginLeft: 8, color: "dimgray" },
    //         }}
    //         {...breadcrumbProps}
    //     >
    //         {showHome && hasDashboard && (
    //             <Anchor component={Link} color="dimmed" to="/">
    //                 <IconHome size={18} />
    //             </Anchor>
    //         )}
    //         {breadcrumbs.map(({ label, icon, href }) => {
    //             return (
    //                 <Group key={label} spacing={4} align="center" noWrap>
    //                     {!hideIcons && icon}
    //                     {href ? (
    //                         <Anchor
    //                             component={Link}
    //                             color="dimmed"
    //                             to={href}
    //                             size="sm"
    //                         >
    //                             {label}
    //                         </Anchor>
    //                     ) : (
    //                         <Text color="dimmed" size="sm">
    //                             {label}
    //                         </Text>
    //                     )}
    //                 </Group>
    //             );
    //         })}
    //     </MantineBreadcrumbs>
    // );
};
