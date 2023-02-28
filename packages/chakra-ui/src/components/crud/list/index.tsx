import React from "react";
import {
    useTranslate,
    userFriendlyResourceName,
    useRefineContext,
    useRouterType,
    useResource,
} from "@pankod/refine-core";

import { Box, Heading } from "@chakra-ui/react";

import { CreateButton, Breadcrumb } from "@components";
import { ListProps } from "../types";

export const List: React.FC<ListProps> = (props) => {
    const {
        canCreate,
        children,
        createButtonProps,
        resource: resourceFromProps,
        wrapperProps,
        contentProps,
        headerProps,
        headerButtonProps,
        headerButtons: headerButtonsFromProps,
        breadcrumb: breadcrumbFromProps,
        title,
    } = props;
    const translate = useTranslate();
    const { options: { breadcrumb: globalBreadcrumb } = {} } =
        useRefineContext();

    const routerType = useRouterType();

    const { resource } = useResource(resourceFromProps);

    const isCreateButtonVisible =
        canCreate ??
        ((resource?.canCreate ?? !!resource?.create) || createButtonProps);

    const breadcrumb =
        typeof breadcrumbFromProps === "undefined"
            ? globalBreadcrumb
            : breadcrumbFromProps;

    const defaultHeaderButtons = isCreateButtonVisible ? (
        <CreateButton
            resourceNameOrRouteName={
                routerType === "legacy"
                    ? resource?.route
                    : resource?.identifier ?? resource?.name
            }
            {...createButtonProps}
        />
    ) : null;

    const headerButtons = headerButtonsFromProps
        ? typeof headerButtonsFromProps === "function"
            ? headerButtonsFromProps({
                  defaultButtons: defaultHeaderButtons,
              })
            : headerButtonsFromProps
        : defaultHeaderButtons;

    const renderTitle = () => {
        if (title) {
            if (typeof title === "string" || typeof title === "number") {
                return (
                    <Heading as="h3" size="lg">
                        {title}
                    </Heading>
                );
            }

            return title;
        }

        return (
            <Heading as="h3" size="lg">
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
            </Heading>
        );
    };

    return (
        <Box
            bg="chakra-body-bg"
            borderRadius="md"
            px="4"
            py="3"
            {...wrapperProps}
        >
            <Box
                mb="3"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap={{ base: "wrap", md: "nowrap" }}
                gap="3"
                {...headerProps}
            >
                <Box minW={200}>
                    {typeof breadcrumb !== "undefined" ? (
                        <>{breadcrumb}</> ?? undefined
                    ) : (
                        <Breadcrumb />
                    )}
                    {renderTitle()}
                </Box>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent={{ base: "flex-start", md: "flex-end" }}
                    gap="2"
                    {...headerButtonProps}
                >
                    {headerButtons}
                </Box>
            </Box>
            <Box {...contentProps}>{children}</Box>
        </Box>
    );
};
