import React, { FC } from "react";
import { RefineCrudEditProps } from "@pankod/refine-ui-types";
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
    useMutationMode,
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
} from "@pankod/refine-core";
import { PageTitle } from "@components/page-title";
import { Breadcrumb } from "@components/breadcrumb";
import {
    DeleteButton,
    DeleteButtonProps,
    ListButton,
    RefreshButton,
    SaveButton,
    SaveButtonProps,
} from "@components/buttons";
import { IconArrowLeft } from "@tabler/icons";

export type EditProps = RefineCrudEditProps<
    SaveButtonProps,
    DeleteButtonProps,
    CenterProps,
    GroupProps,
    CardProps,
    GroupProps,
    BoxProps
>;

export const Edit: FC<EditProps> = (props) => {
    const {
        children,
        resource: resourceFromProps,
        recordItemId,
        deleteButtonProps,
        mutationMode: mutationModeFromProps,
        saveButtonProps,
        canDelete,
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

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeFromProps ?? mutationModeContext;

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isDeleteButtonVisible = canDelete ?? resource.canDelete;

    const id = recordItemId ?? idFromRoute;

    const defaultHeaderButtons = (
        <>
            {!recordItemId && (
                <ListButton resourceNameOrRouteName={resource.route} />
            )}
            <RefreshButton
                resourceNameOrRouteName={resource.route}
                recordItemId={id}
                dataProviderName={dataProviderName}
            />
        </>
    );

    const defaultFooterButtons = (
        <>
            {isDeleteButtonVisible && (
                <DeleteButton
                    mutationMode={mutationMode}
                    onSuccess={() => {
                        list(resource.route ?? resource.name);
                    }}
                    dataProviderName={dataProviderName}
                    {...deleteButtonProps}
                />
            )}
            <SaveButton loading={isLoading} {...saveButtonProps} />
        </>
    );

    const buttonBack =
        typeof goBackFromProps !== "undefined" ? (
            goBackFromProps
        ) : (
            <ActionIcon onClick={routeFromAction ? goBack : undefined}>
                <IconArrowLeft />
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
            ? footerButtonsFromProps({ defaultButtons: defaultFooterButtons })
            : footerButtonsFromProps
        : defaultFooterButtons;

    return (
        <Card p="lg" {...wrapperProps}>
            {breadcrumb}
            <Group position="apart" {...headerProps}>
                {title ?? <PageTitle type="edit" buttonBack={buttonBack} />}
                <Center {...headerButtonProps}>{headerButtons}</Center>
            </Group>
            <Box {...contentProps}>{children}</Box>
            <Group position="right" spacing="md" mt="xl" {...footerButtonProps}>
                {footerButtons}
            </Group>
        </Card>
    );
};
