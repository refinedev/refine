import React from "react";

import {
    useMutationMode,
    useNavigation,
    useTranslate,
    userFriendlyResourceName,
    useRefineContext,
    useToPath,
    useResource,
    useRouterType,
    useBack,
    useGo,
} from "@refinedev/core";

import {
    Card,
    CardHeader,
    IconButton,
    CardContent,
    CardActions,
    Typography,
    Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
    DeleteButton,
    RefreshButton,
    ListButton,
    SaveButton,
    Breadcrumb,
} from "@components";
import { EditProps } from "../types";

/**
 * `<Edit>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/edit} for more details.
 */
export const Edit: React.FC<EditProps> = ({
    title,
    saveButtonProps: saveButtonPropsFromProps,
    mutationMode: mutationModeProp,
    recordItemId,
    children,
    deleteButtonProps: deleteButtonPropsFromProps,
    canDelete,
    resource: resourceFromProps,
    isLoading = false,
    breadcrumb: breadcrumbFromProps,
    dataProviderName,
    wrapperProps,
    headerProps,
    contentProps,
    headerButtonProps,
    headerButtons,
    footerButtonProps,
    footerButtons,
    goBack: goBackFromProps,
}) => {
    const translate = useTranslate();
    const { options: { breadcrumb: globalBreadcrumb } = {} } =
        useRefineContext();
    const { mutationMode: mutationModeContext } = useMutationMode();
    const mutationMode = mutationModeProp ?? mutationModeContext;

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
            deleteButtonPropsFromProps);

    const breadcrumbComponent =
        typeof breadcrumb !== "undefined" ? (
            <>{breadcrumb}</> ?? undefined
        ) : (
            <Breadcrumb />
        );

    const listButtonProps = {
        ...(isLoading ? { disabled: true } : {}),
        resource:
            routerType === "legacy"
                ? resource?.route
                : resource?.identifier ?? resource?.name,
    };

    const refreshButtonProps = {
        ...(isLoading ? { disabled: true } : {}),
        resource:
            routerType === "legacy"
                ? resource?.route
                : resource?.identifier ?? resource?.name,
        recordItemId: id,
        dataProviderName,
    };

    const defaultHeaderButtons = (
        <>
            {!recordItemId && <ListButton {...listButtonProps} />}
            <RefreshButton {...refreshButtonProps} />
        </>
    );

    const deleteButtonProps = {
        ...(isLoading ? { disabled: true } : {}),
        resource:
            routerType === "legacy"
                ? resource?.route
                : resource?.identifier ?? resource?.name,
        mutationMode,
        variant: "outlined",
        onSuccess: () => {
            if (routerType === "legacy") {
                legacyGoList(resource?.route ?? resource?.name ?? "");
            } else {
                go({ to: goListPath });
            }
        },
        recordItemId: id,
        dataProviderName,
        ...deleteButtonPropsFromProps,
    } as const;

    const saveButtonProps = {
        ...(isLoading ? { disabled: true } : {}),
        ...saveButtonPropsFromProps,
    };

    const defaultFooterButtons = (
        <>
            {isDeleteButtonVisible &&
                (id || deleteButtonProps?.recordItemId) && (
                    <DeleteButton {...deleteButtonProps} />
                )}
            <SaveButton {...saveButtonProps} />
        </>
    );

    return (
        <Card {...(wrapperProps ?? {})}>
            {breadcrumbComponent}
            <CardHeader
                sx={{ display: "flex", flexWrap: "wrap" }}
                title={
                    title ?? (
                        <Typography variant="h5">
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
                        </Typography>
                    )
                }
                avatar={
                    typeof goBackFromProps !== "undefined" ? (
                        goBackFromProps
                    ) : (
                        <IconButton
                            onClick={
                                action !== "list" &&
                                typeof action !== "undefined"
                                    ? routerType === "legacy"
                                        ? goBack
                                        : back
                                    : undefined
                            }
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    )
                }
                action={
                    <Box
                        display="flex"
                        gap="16px"
                        {...(headerButtonProps ?? {})}
                    >
                        {headerButtons
                            ? typeof headerButtons === "function"
                                ? headerButtons({
                                      defaultButtons: defaultHeaderButtons,
                                      listButtonProps,
                                      refreshButtonProps,
                                  })
                                : headerButtons
                            : defaultHeaderButtons}
                    </Box>
                }
                {...(headerProps ?? {})}
            />
            <CardContent {...(contentProps ?? {})}>{children}</CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "16px",
                    padding: "16px",
                }}
                {...(footerButtonProps ?? {})}
            >
                {footerButtons
                    ? typeof footerButtons === "function"
                        ? footerButtons({
                              defaultButtons: defaultFooterButtons,
                              deleteButtonProps,
                              saveButtonProps,
                          })
                        : footerButtons
                    : defaultFooterButtons}
            </CardActions>
        </Card>
    );
};
