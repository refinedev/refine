import React from "react";
import { RefineCrudListProps } from "@pankod/refine-ui-types";
import { Box, BoxProps, HStack, Stack, Heading } from "@chakra-ui/react";
import { Card } from "@saas-ui/react";
import {
    ResourceRouterParams,
    useResourceWithRoute,
    userFriendlyResourceName,
    useRouterContext,
    useTranslate,
} from "@pankod/refine-core";

import { CreateButton, CreateButtonProps } from "@components/buttons";
import { Breadcrumb } from "@components/breadcrumb";

export type ListProps = RefineCrudListProps<CreateButtonProps, BoxProps>;

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
        <Card p="md" {...wrapperProps}>
            <HStack align="center" {...headerProps}>
                <Stack spacing="xs">
                    {breadcrumb}
                    {title ?? (
                        <Heading as="h3" transform="capitalize">
                            {translate(
                                `${resource.name}.titles.list`,
                                userFriendlyResourceName(
                                    resource.label ?? resource.name,
                                    "plural",
                                ),
                            )}
                        </Heading>
                    )}
                </Stack>
                <HStack spacing="2" {...headerButtonProps}>
                    {headerButtons}
                </HStack>
            </HStack>
            <Box pt="sm" {...contentProps}>
                {children}
            </Box>
        </Card>
    );
};
