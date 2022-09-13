import React, { FC } from "react";
import { RefineCrudShowProps } from "@pankod/refine-ui-types";
import {
    Box,
    BoxProps,
    Card,
    CardProps,
    Group,
    GroupProps,
    ActionIcon,
    Center,
    CenterProps,
} from "@mantine/core";
import {
    ResourceRouterParams,
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
} from "@pankod/refine-core";
import { PageTitle } from "@components/page-title";
import { Breadcrumb } from "@components/breadcrumb";
import {
    DeleteButton,
    EditButton,
    ListButton,
    RefreshButton,
} from "@components/buttons";
import { ArrowLeft } from "tabler-icons-react";

export type ShowProps = RefineCrudShowProps<
    CenterProps,
    BoxProps,
    CardProps,
    GroupProps,
    BoxProps
>;

export const Show: FC<ShowProps> = (props) => {
    const {
        children,
        resource: resourceFromProps,
        recordItemId,
        canDelete,
        canEdit,
        dataProviderName,
        isLoading,
        footerButtons: footerButtonsFromProps,
        footerButtonProps,
        headerButtons: headerButtonsFromProps,
        headerButtonProps,
        wrapperProps,
        contentProps,
        headerProps,
        goBack: goBackFromProps,
        breadcrumb = <Breadcrumb />,
        title,
    } = props;

    const { goBack, list } = useNavigation();

    const resourceWithRoute = useResourceWithRoute();

    const { useParams } = useRouterContext();

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isDeleteButtonVisible = canDelete ?? resource.canDelete;

    const isEditButtonVisible = canEdit ?? resource.canEdit;

    const id = recordItemId ?? idFromRoute;

    const defaultHeaderButtons = (
        <>
            {!recordItemId && (
                <ListButton resourceNameOrRouteName={resource.route} />
            )}
            {isEditButtonVisible && (
                <EditButton
                    disabled={isLoading}
                    resourceNameOrRouteName={resource.route}
                    recordItemId={id}
                />
            )}
            {isDeleteButtonVisible && (
                <DeleteButton
                    disabled={isLoading}
                    resourceNameOrRouteName={resource.route}
                    recordItemId={id}
                    onSuccess={() => list(resource.route ?? resource.name)}
                    dataProviderName={dataProviderName}
                />
            )}
            <RefreshButton
                disabled={isLoading}
                resourceNameOrRouteName={resource.route}
                recordItemId={id}
                dataProviderName={dataProviderName}
            />
        </>
    );

    const buttonBack =
        typeof goBackFromProps !== "undefined" ? (
            goBackFromProps
        ) : (
            <ActionIcon onClick={routeFromAction ? goBack : undefined}>
                <ArrowLeft />
            </ActionIcon>
        );

    const headerButtons = headerButtonsFromProps
        ? typeof headerButtonsFromProps === "function"
            ? headerButtonsFromProps({
                  defaultButtons: defaultHeaderButtons,
              })
            : headerButtonsFromProps
        : defaultHeaderButtons;

    const footerButtons = footerButtonsFromProps
        ? typeof footerButtonsFromProps === "function"
            ? footerButtonsFromProps({ defaultButtons: null })
            : footerButtonsFromProps
        : null;

    return (
        <Card p="lg" {...wrapperProps}>
            {breadcrumb}
            <Group position="apart" {...headerProps}>
                {title ?? <PageTitle type="show" buttonBack={buttonBack} />}
                <Center {...headerButtonProps}>{headerButtons}</Center>
            </Group>
            <Box {...contentProps}>{children}</Box>
            <Box {...footerButtonProps}>{footerButtons}</Box>
        </Card>
    );
};
