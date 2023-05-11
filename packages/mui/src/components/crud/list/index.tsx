import React from "react";

import {
    useTranslate,
    userFriendlyResourceName,
    useRefineContext,
    useRouterType,
    useResource,
} from "@refinedev/core";

import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";

import { CreateButton, Breadcrumb, CreateButtonProps } from "@components";
import { ListProps } from "../types";
import {
    RefineButtonClassNames,
    RefinePageHeaderClassNames,
} from "@refinedev/ui-types";

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
    createButtonProps: createButtonPropsFromProps,
    resource: resourceFromProps,
    breadcrumb: breadcrumbFromProps,
    wrapperProps,
    headerProps,
    contentProps,
    headerButtonProps,
    headerButtons,
}) => {
    const translate = useTranslate();
    const { options: { breadcrumb: globalBreadcrumb } = {} } =
        useRefineContext();

    const routerType = useRouterType();

    const { resource } = useResource(resourceFromProps);

    const isCreateButtonVisible =
        canCreate ??
        ((resource?.canCreate ?? !!resource?.create) ||
            createButtonPropsFromProps);

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

    const createButtonProps: CreateButtonProps | undefined =
        isCreateButtonVisible
            ? {
                  resource:
                      routerType === "legacy"
                          ? resource?.route
                          : resource?.identifier ?? resource?.name,
                  ...createButtonPropsFromProps,
              }
            : undefined;

    const defaultHeaderButtons = isCreateButtonVisible ? (
        <CreateButton {...createButtonProps} />
    ) : null;

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
                                `${resource?.name}.titles.list`,
                                userFriendlyResourceName(
                                    resource?.meta?.label ??
                                        resource?.options?.label ??
                                        resource?.label ??
                                        resource?.name,
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
                                      createButtonProps,
                                  })
                                : headerButtons
                            : defaultHeaderButtons}
                    </Box>
                }
                {...(headerProps ?? {})}
            />
            <CardContent {...(contentProps ?? {})}>{children}</CardContent>
        </Card>
    );
};
