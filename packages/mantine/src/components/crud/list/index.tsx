import React from "react";
import { Box, Card, Group, Stack, Title } from "@mantine/core";
import {
  useRefineContext,
  useResource,
  useUserFriendlyName,
  useRouterType,
  useTranslate,
} from "@refinedev/core";

import { CreateButton, Breadcrumb, type CreateButtonProps } from "@components";
import type { ListProps } from "../types";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";

export const List: React.FC<ListProps> = (props) => {
  const {
    canCreate,
    children,
    createButtonProps: createButtonPropsFromProps,
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
  const {
    options: { breadcrumb: globalBreadcrumb } = {},
  } = useRefineContext();

  const routerType = useRouterType();
  const getUserFriendlyName = useUserFriendlyName();

  const { resource, identifier } = useResource(resourceFromProps);

  const isCreateButtonVisible =
    canCreate ??
    ((resource?.canCreate ?? !!resource?.create) || createButtonPropsFromProps);

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const createButtonProps: CreateButtonProps | undefined = isCreateButtonVisible
    ? ({
        size: "sm",
        resource: routerType === "legacy" ? resource?.route : identifier,
        ...createButtonPropsFromProps,
      } as const)
    : undefined;

  const defaultHeaderButtons = isCreateButtonVisible ? (
    <CreateButton {...createButtonProps} />
  ) : null;

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? (
      <>{breadcrumb}</> ?? undefined
    ) : (
      <Breadcrumb />
    );

  const headerButtons = headerButtonsFromProps
    ? typeof headerButtonsFromProps === "function"
      ? headerButtonsFromProps({
          defaultButtons: defaultHeaderButtons,
          createButtonProps,
        })
      : headerButtonsFromProps
    : defaultHeaderButtons;

  return (
    <Card p="md" {...wrapperProps}>
      <Group position="apart" align="center" {...headerProps}>
        <Stack spacing="xs">
          {breadcrumbComponent}
          {title ?? (
            <Title
              order={3}
              transform="capitalize"
              className={RefinePageHeaderClassNames.Title}
            >
              {translate(
                `${identifier}.titles.list`,
                getUserFriendlyName(
                  resource?.meta?.label ??
                    resource?.options?.label ??
                    resource?.label ??
                    identifier,
                  "plural",
                ),
              )}
            </Title>
          )}
        </Stack>
        <Group spacing="xs" {...headerButtonProps}>
          {headerButtons}
        </Group>
      </Group>
      <Box pt="sm" {...contentProps}>
        {children}
      </Box>
    </Card>
  );
};
