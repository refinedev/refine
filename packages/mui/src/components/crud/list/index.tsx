import React from "react";

import {
    useResourceWithRoute,
    useTranslate,
    useRouterContext,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";
import { RefineCrudListProps } from "@pankod/refine-ui-types";

import {
    Card,
    CardHeader,
    CardContent,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    Typography,
    Box,
    BoxProps,
} from "@mui/material";

import { CreateButton, CreateButtonProps, Breadcrumb } from "@components";

export type ListProps = RefineCrudListProps<
    CreateButtonProps,
    BoxProps,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    {
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
    }
>;

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/list} for more details.
 */
export const List: React.FC<ListProps> = ({
    title,
    canCreate,
    children,
    createButtonProps,
    resource: resourceFromProps,
    cardProps,
    cardHeaderProps,
    cardContentProps,
    breadcrumb = <Breadcrumb />,
    wrapperProps,
    headerProps,
    contentProps,
    headerButtonProps,
    headerButtons,
}) => {
    const { useParams } = useRouterContext();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const translate = useTranslate();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isCreateButtonVisible =
        canCreate ?? (resource.canCreate || createButtonProps);

    const defaultHeaderButtons = isCreateButtonVisible ? (
        <CreateButton
            resourceNameOrRouteName={resource.route}
            {...createButtonProps}
        />
    ) : null;

    return (
        <Card {...(cardProps ?? {})} {...(wrapperProps ?? {})}>
            {breadcrumb}
            <CardHeader
                sx={{ display: "flex", flexWrap: "wrap" }}
                title={
                    title ?? (
                        <Typography variant="h5">
                            {translate(
                                `${resource.name}.titles.list`,
                                userFriendlyResourceName(
                                    resource.label ?? resource.name,
                                    "plural",
                                ),
                            )}
                        </Typography>
                    )
                }
                action={
                    <Box display="flex" gap="16px" {...headerButtonProps}>
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
        </Card>
    );
};
