import React from "react";

import {
    useResourceWithRoute,
    useTranslate,
    useRouterContext,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";

import {
    Card,
    CardHeader,
    CardContent,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    Typography,
    Box,
} from "@mui/material";

import { CreateButton, CreateButtonProps } from "@components";

export interface ListProps {
    canCreate?: boolean;
    createButtonProps?: CreateButtonProps;
    resource?: string;
    cardProps?: CardProps;
    cardHeaderProps?: CardHeaderProps;
    cardContentProps?: CardContentProps;
}

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/list} for more details.
 */
export const List: React.FC<ListProps> = ({
    canCreate,
    children,
    createButtonProps,
    resource: resourceFromProps,
    cardProps,
    cardHeaderProps,
    cardContentProps,
}) => {
    const { useParams } = useRouterContext();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const translate = useTranslate();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isCreateButtonVisible =
        canCreate ?? (resource.canCreate || createButtonProps);

    const defaultExtra = isCreateButtonVisible && (
        <CreateButton
            resourceNameOrRouteName={resource.route}
            data-testid="list-create-button"
            {...createButtonProps}
        />
    );

    return (
        <Card {...cardProps}>
            <CardHeader
                sx={{ display: "flex", flexWrap: "wrap" }}
                title={
                    <Typography variant="h5">
                        {translate(
                            `${resource.name}.titles.list`,
                            userFriendlyResourceName(
                                resource.label ?? resource.name,
                                "plural",
                            ),
                        )}
                    </Typography>
                }
                action={
                    <Box display="flex" gap="16px">
                        {defaultExtra}
                    </Box>
                }
                {...cardHeaderProps}
            />
            <CardContent {...cardContentProps}>{children}</CardContent>
        </Card>
    );
};
