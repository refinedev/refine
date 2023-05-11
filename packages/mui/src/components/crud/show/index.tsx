import React from "react";
import {
    useNavigation,
    useTranslate,
    userFriendlyResourceName,
    useRefineContext,
    useRouterType,
    useBack,
    useGo,
    useResource,
    useToPath,
} from "@refinedev/core";

import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Box,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
    DeleteButton,
    RefreshButton,
    ListButton,
    EditButton,
    Breadcrumb,
    ListButtonProps,
    EditButtonProps,
    DeleteButtonProps,
    RefreshButtonProps,
} from "@components";
import { ShowProps } from "../types";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";

/**
 * `<Show>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/show} for more details.
 */
export const Show: React.FC<ShowProps> = ({
    title,
    canEdit,
    canDelete,
    isLoading = false,
    children,
    resource: resourceFromProps,
    recordItemId,
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

    const hasList = resource?.list && !recordItemId;
    const hasDelete =
        canDelete ?? resource?.meta?.canDelete ?? resource?.canDelete;
    const isDeleteButtonVisible = hasDelete && typeof id !== "undefined";
    const isEditButtonVisible =
        canEdit ?? resource?.canEdit ?? !!resource?.edit;

    const breadcrumbComponent =
        typeof breadcrumb !== "undefined" ? (
            <>{breadcrumb}</> ?? undefined
        ) : (
            <Breadcrumb />
        );

    const listButtonProps: ListButtonProps | undefined = hasList
        ? {
              ...(isLoading ? { disabled: true } : {}),
              resource:
                  routerType === "legacy"
                      ? resource?.route
                      : resource?.identifier ?? resource?.name,
          }
        : undefined;
    const editButtonProps: EditButtonProps | undefined = isEditButtonVisible
        ? {
              ...(isLoading ? { disabled: true } : {}),
              resource:
                  routerType === "legacy"
                      ? resource?.route
                      : resource?.identifier ?? resource?.name,
              recordItemId: id,
          }
        : undefined;
    const deleteButtonProps: DeleteButtonProps | undefined =
        isDeleteButtonVisible
            ? {
                  ...(isLoading ? { disabled: true } : {}),
                  resource:
                      routerType === "legacy"
                          ? resource?.route
                          : resource?.identifier ?? resource?.name,
                  recordItemId: id,
                  onSuccess: () => {
                      if (routerType === "legacy") {
                          legacyGoList(resource?.route ?? resource?.name ?? "");
                      } else {
                          go({ to: goListPath });
                      }
                  },
                  dataProviderName,
              }
            : undefined;
    const refreshButtonProps: RefreshButtonProps = {
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
            {hasList && <ListButton {...listButtonProps} />}
            {isEditButtonVisible && <EditButton {...editButtonProps} />}
            {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
            <RefreshButton {...refreshButtonProps} />
        </>
    );

    return (
        <Card {...(wrapperProps ?? {})}>
            {breadcrumbComponent}
            <CardHeader
                sx={{ display: "flex", flexWrap: "wrap" }}
                title={
                    title ?? (
                        <Typography
                            variant="h5"
                            className={RefinePageHeaderClassNames.Title}
                        >
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
                                      deleteButtonProps,
                                      editButtonProps,
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
                sx={{ padding: "16px" }}
                {...(footerButtonProps ?? {})}
            >
                {footerButtons
                    ? typeof footerButtons === "function"
                        ? footerButtons({ defaultButtons: null })
                        : footerButtons
                    : null}
            </CardActions>
        </Card>
    );
};
