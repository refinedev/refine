import React from "react";

import {
    useResourceWithRoute,
    useMutationMode,
    useNavigation,
    useTranslate,
    useRouterContext,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";
import { RefineCrudEditProps } from "@pankod/refine-ui-types";

import {
    Card,
    CardHeader,
    IconButton,
    CardContent,
    CardActions,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    CardActionsProps,
    Typography,
    Box,
    BoxProps,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
    DeleteButton,
    RefreshButton,
    ListButton,
    SaveButton,
    Breadcrumb,
    SaveButtonProps,
} from "@components";
import { DeleteButtonProps } from "@components";

export type EditProps = RefineCrudEditProps<
    SaveButtonProps,
    DeleteButtonProps,
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
 * `<Edit>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/edit} for more details.
 */
export const Edit: React.FC<EditProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    recordItemId,
    children,
    deleteButtonProps,
    canDelete,
    resource: resourceFromProps,
    isLoading = false,
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

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { useParams } = useRouterContext();

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isDeleteButtonVisible =
        canDelete ?? (resource.canDelete || deleteButtonProps);

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
                    variant="outlined"
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

    return (
        <Card {...(cardProps ?? {})} {...(wrapperProps ?? {})}>
            {breadcrumb}
            <CardHeader
                sx={{ display: "flex", flexWrap: "wrap" }}
                title={
                    title ?? (
                        <Typography variant="h5">
                            {translate(
                                `${resource.name}.titles.edit`,
                                `Edit ${userFriendlyResourceName(
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
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "16px",
                    padding: "16px",
                }}
                {...(cardActionsProps ?? {})}
                {...(footerButtonProps ?? {})}
            >
                {footerButtons
                    ? typeof footerButtons === "function"
                        ? footerButtons({
                              defaultButtons: defaultFooterButtons,
                          })
                        : footerButtons
                    : actionButtons
                    ? actionButtons
                    : defaultFooterButtons}
            </CardActions>
        </Card>
    );
};
