import React from "react";
import { Space } from "antd";
import {
  useTranslate,
  useUserFriendlyName,
  useRefineContext,
  useRouterType,
  useResource,
} from "@refinedev/core";

import {
  Breadcrumb,
  CreateButton,
  type CreateButtonProps,
  PageHeader,
} from "@components";
import type { ListProps } from "../types";

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/list} for more details.
 */
export const List: React.FC<ListProps> = ({
  canCreate,
  title,
  children,
  createButtonProps: createButtonPropsFromProps,
  resource: resourceFromProps,
  wrapperProps,
  contentProps,
  headerProps,
  breadcrumb: breadcrumbFromProps,
  headerButtonProps,
  headerButtons,
}) => {
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
    ? {
        size: "middle",
        resource: routerType === "legacy" ? resource?.route : identifier,
        ...createButtonPropsFromProps,
      }
    : undefined;

  const defaultExtra = isCreateButtonVisible ? (
    <CreateButton {...createButtonProps} />
  ) : null;

  return (
    <div {...(wrapperProps ?? {})}>
      <PageHeader
        title={
          title ??
          translate(
            `${identifier}.titles.list`,
            getUserFriendlyName(
              resource?.meta?.label ??
                resource?.options?.label ??
                resource?.label ??
                identifier,
              "plural",
            ),
          )
        }
        extra={
          headerButtons ? (
            <Space wrap {...headerButtonProps}>
              {typeof headerButtons === "function"
                ? headerButtons({
                    defaultButtons: defaultExtra,
                    createButtonProps,
                  })
                : headerButtons}
            </Space>
          ) : (
            defaultExtra
          )
        }
        breadcrumb={
          typeof breadcrumb !== "undefined" ? (
            <>{breadcrumb}</> ?? undefined
          ) : (
            <Breadcrumb />
          )
        }
        {...(headerProps ?? {})}
      >
        <div {...(contentProps ?? {})}>{children}</div>
      </PageHeader>
    </div>
  );
};
