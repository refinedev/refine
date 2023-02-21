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
    useMutationMode,
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
    ListButton,
    RefreshButton,
    SaveButton,
    Breadcrumb,
} from "@components";
import { EditProps } from "../types";

export const Edit: React.FC<EditProps> = (props) => {
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
        breadcrumb: breadcrumbFromProps,
        title,
    } = props;
    const translate = useTranslate();
    const { options: { breadcrumb: globalBreadcrumb } = {} } =
        useRefineContext();
    const { mutationMode: mutationModeContext } = useMutationMode();
    const mutationMode = mutationModeFromProps ?? mutationModeContext;

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

    const isDeleteButtonVisible =
        canDelete ??
        ((resource?.meta?.canDelete ?? resource?.canDelete) ||
            deleteButtonProps);

    const breadcrumbComponent =
        typeof breadcrumb !== "undefined" ? (
            <>{breadcrumb}</> ?? undefined
        ) : (
            <Breadcrumb />
        );

    const loadingOverlayVisible =
        isLoading ?? saveButtonProps?.disabled ?? false;

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

    const defaultFooterButtons = (
        <>
            {isDeleteButtonVisible &&
                (id || deleteButtonProps?.recordItemId) && (
                    <DeleteButton
                        {...(isLoading ? { disabled: true } : {})}
                        mutationMode={mutationMode}
                        onSuccess={() => {
                            if (routerType === "legacy") {
                                legacyGoList(
                                    resource?.route ?? resource?.name ?? "",
                                );
                            } else {
                                go({ to: goListPath });
                            }
                        }}
                        recordItemId={id}
                        dataProviderName={dataProviderName}
                        {...deleteButtonProps}
                    />
                )}
            <SaveButton
                {...(isLoading ? { disabled: true } : {})}
                {...saveButtonProps}
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
            ? footerButtonsFromProps({ defaultButtons: defaultFooterButtons })
            : footerButtonsFromProps
        : defaultFooterButtons;

    return (
        <Card p="md" {...wrapperProps}>
            <LoadingOverlay visible={loadingOverlayVisible} />
            <Group position="apart" {...headerProps}>
                <Stack spacing="xs">
                    {breadcrumbComponent}
                    <Group spacing="xs">
                        {buttonBack}
                        {title ?? (
                            <Title order={3} transform="capitalize">
                                {translate(
                                    `${resource?.name}.titles.edit`,
                                    `Edit ${userFriendlyResourceName(
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
