import React from "react";
import { RefineCrudListProps } from "@pankod/refine-ui-types";
import {
    Box,
    BoxProps,
    Card,
    CardProps,
    Group,
    GroupProps,
    Stack,
    Title,
} from "@mantine/core";
import {
    ResourceRouterParams,
    useRefineContext,
    useResourceWithRoute,
    userFriendlyResourceName,
    useRouterContext,
    useTranslate,
} from "@pankod/refine-core";

import { CreateButton, CreateButtonProps } from "@components/buttons";
import { Breadcrumb } from "@components/breadcrumb";

export type ListProps = RefineCrudListProps<
    CreateButtonProps,
    GroupProps,
    CardProps,
    GroupProps,
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
        breadcrumb: breadcrumbFromProps,
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

    const { options } = useRefineContext();
    const breadcrumb = breadcrumbFromProps ?? options?.breadcrumb;

    const breadcrumbComponent =
        typeof breadcrumb !== "undefined" ? (
            <>{breadcrumb}</> ?? undefined
        ) : (
            <Breadcrumb />
        );

    const headerButtons = headerButtonsFromProps
        ? typeof headerButtonsFromProps === "function"
            ? headerButtonsFromProps({
                  defaultButtons: defaultHeaderButtons,
              })
            : headerButtonsFromProps
        : defaultHeaderButtons;

    return (
        <Card p="md" {...wrapperProps}>
            <Group position="apart" align="center" {...headerProps}>
                <Stack spacing="xs">
                    {breadcrumbComponent}
                    {title ?? (
                        <Title order={3} transform="capitalize">
                            {translate(
                                `${resource.name}.titles.list`,
                                userFriendlyResourceName(
                                    resource.label ?? resource.name,
                                    "plural",
                                ),
                            )}
                        </Title>
                    )}
                </Stack>
                <Group spacing="xs" {...headerButtonProps}>
                    {headerButtons}
                </Group>
            </Group>
            <Box pt="sm" {...contentProps}>
                {children}
            </Box>
        </Card>
    );
};
