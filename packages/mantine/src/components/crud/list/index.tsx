import React, { FC } from "react";
import { RefineCrudListProps } from "@pankod/refine-ui-types";
import {
    Box,
    BoxProps,
    Card,
    CardProps,
    Center,
    CenterProps,
    Group,
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
    CenterProps,
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
        <Card p="lg" {...wrapperProps}>
            {breadcrumb}
            <Group position="apart" mb={24} {...headerProps}>
                {title}
                <Center {...headerButtonProps}>{headerButtons}</Center>
            </Group>
            <Box {...contentProps}>{children}</Box>
        </Card>
    );
};
