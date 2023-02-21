import React from "react";
import {
    Box,
    Card,
    Group,
    ActionIcon,
    Stack,
    Title,
    LoadingOverlay,
} from "@mantine/core";
import {
    useBack,
    useGo,
    useNavigation,
    useRefineContext,
    useResource,
    userFriendlyResourceName,
    useRouterType,
    useToPath,
    useTranslate,
} from "@pankod/refine-core";
import { IconArrowLeft } from "@tabler/icons";

import {
    DeleteButton,
    EditButton,
    ListButton,
    RefreshButton,
    Breadcrumb,
} from "@components";
import { ShowProps } from "../types";

export const Show: React.FC<ShowProps> = (props) => {
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
        breadcrumb: breadcrumbFromProps,
        title,
    } = props;
    const translate = useTranslate();
    const { options: { breadcrumb: globalBreadcrumb } = {} } =
        useRefineContext();

    const routerType = useRouterType();
    const back = useBack();
    const go = useGo();
    const { goBack, list: legacyGoList } = useNavigation();

    const {
        resource,
        action,
        id: idFromParams,
    } = useResource(resourceFromProps);

    const goListPath = useToPath({
        resource,
        action: "list",
    });

    const id = recordItemId ?? idFromParams;

    const breadcrumb =
        typeof breadcrumbFromProps === "undefined"
            ? globalBreadcrumb
            : breadcrumbFromProps;

    const breadcrumbComponent =
        typeof breadcrumb !== "undefined" ? (
            <>{breadcrumb}</> ?? undefined
        ) : (
            <Breadcrumb />
        );

    const isDeleteButtonVisible =
        canDelete ?? resource?.meta?.canDelete ?? resource?.canDelete;
    const isEditButtonVisible =
        canEdit ?? resource?.canEdit ?? !!resource?.edit;

    const loadingOverlayVisible = isLoading ?? false;

    const defaultHeaderButtons = (
        <>
            {!recordItemId && (
                <ListButton
                    {...(isLoading ? { disabled: true } : {})}
                    resourceNameOrRouteName={
                        routerType === "legacy"
                            ? resource?.route
                            : resource?.identifier ?? resource?.name
                    }
                />
            )}
            {isEditButtonVisible && (
                <EditButton
                    {...(isLoading ? { disabled: true } : {})}
                    resourceNameOrRouteName={
                        routerType === "legacy"
                            ? resource?.route
                            : resource?.identifier ?? resource?.name
                    }
                    recordItemId={id}
                />
            )}
            {isDeleteButtonVisible && (
                <DeleteButton
                    {...(isLoading ? { disabled: true } : {})}
                    resourceNameOrRouteName={
                        routerType === "legacy"
                            ? resource?.route
                            : resource?.identifier ?? resource?.name
                    }
                    recordItemId={id}
                    onSuccess={() => {
                        if (routerType === "legacy") {
                            legacyGoList(
                                resource?.route ?? resource?.name ?? "",
                            );
                        } else {
                            go({ to: goListPath });
                        }
                    }}
                    dataProviderName={dataProviderName}
                />
            )}
            <RefreshButton
                {...(isLoading ? { disabled: true } : {})}
                resourceNameOrRouteName={
                    routerType === "legacy"
                        ? resource?.route
                        : resource?.identifier ?? resource?.name
                }
                recordItemId={id}
                dataProviderName={dataProviderName}
            />
        </>
    );

    const buttonBack =
        goBackFromProps === (false || null) ? null : (
            <ActionIcon
                onClick={
                    action !== "list" && typeof action !== "undefined"
                        ? routerType === "legacy"
                            ? goBack
                            : back
                        : undefined
                }
            >
                {typeof goBackFromProps !== "undefined" ? (
                    goBackFromProps
                ) : (
                    <IconArrowLeft />
                )}
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
        <Card p="md" {...wrapperProps}>
            <LoadingOverlay visible={loadingOverlayVisible} />
            <Group position="apart" align="center" {...headerProps}>
                <Stack spacing="xs">
                    {breadcrumbComponent}
                    <Group spacing="xs">
                        {buttonBack}
                        {title ?? (
                            <Title order={3} transform="capitalize">
                                {translate(
                                    `${resource?.name}.titles.show`,
                                    `Show ${userFriendlyResourceName(
                                        resource?.meta?.label ??
                                            resource?.options?.label ??
                                            resource?.label ??
                                            resource?.name,
                                        "singular",
                                    )}`,
                                )}
                            </Title>
                        )}
                    </Group>
                </Stack>
                <Group spacing="xs" {...headerButtonProps}>
                    {headerButtons}
                </Group>
            </Group>
            <Box pt="sm" {...contentProps}>
                {children}
            </Box>
            <Group position="right" spacing="xs" mt="md" {...footerButtonProps}>
                {footerButtons}
            </Group>
        </Card>
    );
};
