import React, { FC } from "react";
import { RefineCrudListProps } from "@pankod/refine-ui-types";
import {
    Box,
    BoxProps,
    Card,
    CardProps,
    Group,
    GroupProps,
    Stack,
} from "@mantine/core";
import { CreateButton, CreateButtonProps } from "@components/buttons";
import {
    ResourceRouterParams,
    useResourceWithRoute,
    useRouterContext,
} from "@pankod/refine-core";
import { PageTitle } from "@components/page-title";
import { Breadcrumb } from "@components/breadcrumb";

export type ListProps = RefineCrudListProps<
    CreateButtonProps,
    GroupProps,
    CardProps,
    BoxProps,
    BoxProps
>;

export const List: FC<ListProps> = (props) => {
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
        title = <PageTitle />,
    } = props;

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
            <Group position="apart" align="center" {...headerProps}>
                <Stack spacing="xs">
                    {breadcrumb}
                    {title}
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
