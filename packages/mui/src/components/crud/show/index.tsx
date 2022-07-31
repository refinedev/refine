import React from "react";
import {
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    ResourceRouterParams,
    userFriendlyResourceName,
} from "@pankod/refine-core";
import { RefineCrudShowProps } from "@pankod/refine-ui-types";

import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Box,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    CardActionsProps,
    Typography,
    BoxProps,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
    DeleteButton,
    RefreshButton,
    ListButton,
    EditButton,
    Breadcrumb,
} from "@components";

export type ShowProps = RefineCrudShowProps<
    BoxProps,
    CardActionsProps,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    {
        /**
         * @deprecated use `headerButtons` or `footerButtons` instead.
         */
        actionButtons?: React.ReactNode;
        /**
         * @deprecated use `wrapperProps` instead.
         */
        cardProps?: CardProps;
        /**
         * @deprecated use `headerProps` instead.
         */
        cardHeaderProps?: CardHeaderProps;
        /**
         * @deprecated use `contentProps` instead.
         */
        cardContentProps?: CardContentProps;
        /**
         * @deprecated use `footerButtonProps` instead.
         */
        cardActionsProps?: CardActionsProps;
    }
>;

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
    actionButtons,
    isLoading = false,
    children,
    resource: resourceFromProps,
    recordItemId,
    cardProps,
    cardHeaderProps,
    cardContentProps,
    cardActionsProps,
    breadcrumb = <Breadcrumb />,
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
                    resourceNameOrRouteName={resource.route}
                    recordItemId={id}
                    onSuccess={() => list(resource.route ?? resource.name)}
                    dataProviderName={dataProviderName}
                />
            )}
            <RefreshButton
                resourceNameOrRouteName={resource.route}
                recordItemId={id}
                dataProviderName={dataProviderName}
            />
        </>
    );

    return (
        <Card {...(cardProps ?? {})} {...(wrapperProps ?? {})}>
            {breadcrumb}
            <CardHeader
                sx={{ display: "flex", flexWrap: "wrap" }}
                title={
                    title ?? (
                        <Typography variant="h5">
                            {translate(
                                `${resource.name}.titles.show`,
                                `Show ${userFriendlyResourceName(
                                    resource.label ?? resource.name,
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
                            onClick={routeFromAction ? goBack : undefined}
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
                                  })
                                : headerButtons
                            : defaultHeaderButtons}
                    </Box>
                }
                {...(cardHeaderProps ?? {})}
                {...(headerProps ?? {})}
            />
            <CardContent
                {...(cardContentProps ?? {})}
                {...(contentProps ?? {})}
            >
                {children}
            </CardContent>
            <CardActions
                sx={{ padding: "16px" }}
                {...(cardActionsProps ?? {})}
                {...(footerButtonProps ?? {})}
            >
                {footerButtons
                    ? typeof footerButtons === "function"
                        ? footerButtons({ defaultButtons: null })
                        : footerButtons
                    : actionButtons
                    ? actionButtons
                    : null}
                {actionButtons ? actionButtons : null}
            </CardActions>
        </Card>
    );
};
