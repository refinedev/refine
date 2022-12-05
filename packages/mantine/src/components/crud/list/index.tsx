import React from "react";
import { Box, Card, Group, Stack, Title } from "@mantine/core";
import {
    ResourceRouterParams,
    useRefineContext,
    useResourceWithRoute,
    userFriendlyResourceName,
    useRouterContext,
    useTranslate,
} from "@pankod/refine-core";

import { CreateButton, Breadcrumb } from "@components";
import { ListProps } from "../types";

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
    const breadcrumb =
        typeof breadcrumbFromProps === "undefined"
            ? options?.breadcrumb
            : breadcrumbFromProps;

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
