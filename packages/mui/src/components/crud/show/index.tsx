import React from "react";
import {
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    ResourceRouterParams,
    userFriendlyResourceName,
    BaseKey,
} from "@pankod/refine-core";

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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
    DeleteButton,
    RefreshButton,
    ListButton,
    EditButton,
} from "@components";

export interface ShowProps {
    canEdit?: boolean;
    canDelete?: boolean;
    actionButtons?: React.ReactNode;
    isLoading?: boolean;
    resource?: string;
    recordItemId?: BaseKey;
    cardProps?: CardProps;
    cardHeaderProps?: CardHeaderProps;
    cardContentProps?: CardContentProps;
    cardActionsProps?: CardActionsProps;
}

/**
 * `<Show>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 */
export const Show: React.FC<ShowProps> = ({
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

    return (
        <Card {...cardProps}>
            <CardHeader
                title={translate(
                    `${resource.name}.titles.create`,
                    `Show ${userFriendlyResourceName(
                        resource.label ?? resource.name,
                        "singular",
                    )}`,
                )}
                avatar={
                    <IconButton onClick={routeFromAction ? goBack : undefined}>
                        <ArrowBackIcon />
                    </IconButton>
                }
                action={
                    <Box sx={{ display: "flex" }}>
                        {!recordItemId && (
                            <ListButton
                                data-testid="show-list-button"
                                resourceNameOrRouteName={resource.route}
                            />
                        )}
                        {isEditButtonVisible && (
                            <EditButton
                                disabled={isLoading}
                                data-testid="show-edit-button"
                                resourceNameOrRouteName={resource.route}
                                recordItemId={id}
                            />
                        )}
                        {isDeleteButtonVisible && (
                            <DeleteButton
                                resourceNameOrRouteName={resource.route}
                                data-testid="show-delete-button"
                                recordItemId={id}
                                onSuccess={() =>
                                    list(resource.route ?? resource.name)
                                }
                            />
                        )}
                        <RefreshButton
                            resourceNameOrRouteName={resource.route}
                            recordItemId={id}
                        />
                    </Box>
                }
                {...cardHeaderProps}
            />
            <CardContent {...cardContentProps}>{children}</CardContent>
            <CardActions {...cardActionsProps}>
                {actionButtons ? [actionButtons] : undefined}
            </CardActions>
        </Card>
    );
};
