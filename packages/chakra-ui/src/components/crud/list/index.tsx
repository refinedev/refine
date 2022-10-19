import React from "react";
import { RefineCrudListProps } from "@pankod/refine-ui-types";
import {
    ResourceRouterParams,
    useResourceWithRoute,
    userFriendlyResourceName,
    useRouterContext,
    useTranslate,
} from "@pankod/refine-core";
import { Box, Heading, HStack, BoxProps, StackProps } from "@chakra-ui/react";

import { CreateButton, CreateButtonProps } from "@components/buttons";
import { Breadcrumb } from "@components/breadcrumb";

export type ListProps = RefineCrudListProps<
    CreateButtonProps,
    BoxProps,
    StackProps,
    BoxProps,
    BoxProps
>;

export const List: React.FC<ListProps> = (props) => {
    const {
        canCreate,
        children,
        createButtonProps,
        resource: resourceFromProps,
        wrapperProps,
        contentProps,
        headerProps,
        headerButtonProps,
        headerButtons: headerButtonsFromProps,
        breadcrumb = <Breadcrumb />,
        title,
    } = props;
    const translate = useTranslate();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isCreateButtonVisible =
        canCreate ?? (resource.canCreate || createButtonProps);

    const defaultHeaderButtons = isCreateButtonVisible ? (
        <CreateButton
            size="sm"
            resourceNameOrRouteName={resource.route}
            {...createButtonProps}
        />
    ) : null;

    const headerButtons = headerButtonsFromProps
        ? typeof headerButtonsFromProps === "function"
            ? headerButtonsFromProps({
                  defaultButtons: defaultHeaderButtons,
              })
            : headerButtonsFromProps
        : defaultHeaderButtons;

    return (
        <Box bg="white" borderRadius="md" px="4" py="3" {...wrapperProps}>
            <Box mb="2" {...headerProps}>
                {breadcrumb}
                <HStack justifyContent="space-between">
                    {title ?? (
                        <Heading as="h3" size="md">
                            {translate(
                                `${resource.name}.titles.list`,
                                userFriendlyResourceName(
                                    resource.label ?? resource.name,
                                    "plural",
                                ),
                            )}
                        </Heading>
                    )}
                    <HStack {...headerButtonProps}>{headerButtons}</HStack>
                </HStack>
            </Box>
            <Box {...contentProps}>{children}</Box>
        </Box>
    );
};
