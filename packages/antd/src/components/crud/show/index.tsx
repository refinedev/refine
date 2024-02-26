import React from "react";
import { Card, Space, Spin } from "antd";
import {
  useNavigation,
  useTranslate,
  useUserFriendlyName,
  useRefineContext,
  useResource,
  useToPath,
  useRouterType,
  useBack,
  useGo,
} from "@refinedev/core";

import {
  EditButton,
  DeleteButton,
  RefreshButton,
  ListButton,
  Breadcrumb,
  PageHeader,
  ListButtonProps,
  EditButtonProps,
  DeleteButtonProps,
  RefreshButtonProps,
} from "@components";
import { ShowProps } from "../types";

/**
 * `<Show>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/show} for more details.
 */
export const Show: React.FC<ShowProps> = ({
  title,
  canEdit,
  canDelete,
  isLoading = false,
  children,
  resource: resourceFromProps,
  recordItemId,
  dataProviderName,
  breadcrumb: breadcrumbFromProps,
  contentProps,
  headerProps,
  wrapperProps,
  headerButtons,
  footerButtons,
  footerButtonProps,
  headerButtonProps,
  goBack: goBackFromProps,
}) => {
  const translate = useTranslate();
  const {
    options: { breadcrumb: globalBreadcrumb } = {},
  } = useRefineContext();

  const routerType = useRouterType();
  const back = useBack();
  const go = useGo();
  const { goBack, list: legacyGoList } = useNavigation();
  const getUserFriendlyName = useUserFriendlyName();

  const {
    resource,
    action,
    id: idFromParams,
    identifier,
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
  const isDeleteButtonVisible =
    canDelete ?? resource?.meta?.canDelete ?? resource?.canDelete;
  const isEditButtonVisible = canEdit ?? resource?.canEdit ?? !!resource?.edit;

  const listButtonProps: ListButtonProps | undefined = hasList
    ? {
        resource: routerType === "legacy" ? resource?.route : identifier,
      }
    : undefined;
  const editButtonProps: EditButtonProps | undefined = isEditButtonVisible
    ? {
        ...(isLoading ? { disabled: true } : {}),
        type: "primary",
        resource: routerType === "legacy" ? resource?.route : identifier,
        recordItemId: id,
      }
    : undefined;
  const deleteButtonProps: DeleteButtonProps | undefined = isDeleteButtonVisible
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: routerType === "legacy" ? resource?.route : identifier,
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
    resource: routerType === "legacy" ? resource?.route : identifier,
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
    <div {...(wrapperProps ?? {})}>
      <PageHeader
        ghost={false}
        backIcon={goBackFromProps}
        onBack={
          action !== "list" && typeof action !== "undefined"
            ? routerType === "legacy"
              ? goBack
              : back
            : undefined
        }
        title={
          title ??
          translate(
            `${identifier}.titles.show`,
            `Show ${getUserFriendlyName(
              resource?.meta?.label ??
                resource?.options?.label ??
                resource?.label ??
                identifier,
              "singular",
            )}`,
          )
        }
        extra={
          <Space key="extra-buttons" wrap {...(headerButtonProps ?? {})}>
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
          </Space>
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
        <Spin spinning={isLoading}>
          <Card
            bordered={false}
            actions={
              footerButtons
                ? [
                    <Space key="footer-buttons" wrap {...footerButtonProps}>
                      {typeof footerButtons === "function"
                        ? footerButtons({
                            defaultButtons: null,
                          })
                        : footerButtons}
                    </Space>,
                  ]
                : undefined
            }
            {...(contentProps ?? {})}
          >
            {children}
          </Card>
        </Spin>
      </PageHeader>
    </div>
  );
};
