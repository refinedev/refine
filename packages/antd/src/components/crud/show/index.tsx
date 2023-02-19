import React from "react";
import { Card, Space, Spin } from "antd";
import {
    useNavigation,
    useTranslate,
    userFriendlyResourceName,
    useRefineContext,
    useResource,
    useToPath,
    useRouterType,
    useBack,
    useGo,
} from "@pankod/refine-core";

import {
    EditButton,
    DeleteButton,
    RefreshButton,
    ListButton,
    Breadcrumb,
    PageHeader,
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
    const { options: { breadcrumb: globalBreadcrumb } = {} } =
        useRefineContext();

    const routerType = useRouterType();
    const back = useBack();
    const go = useGo();
    const { goBack, list: legacyGoList } = useNavigation();

    const {
        resource,
        action,
        id: idFromParams,
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

    const isDeleteButtonVisible =
        canDelete ?? resource?.meta?.canDelete ?? resource?.canDelete;
    const isEditButtonVisible =
        canEdit ?? resource?.canEdit ?? !!resource?.edit;

    const defaultHeaderButtons = (
        <>
            {!recordItemId && (
                <ListButton
                    resourceNameOrRouteName={
                        routerType === "legacy"
                            ? resource?.route
                            : resource?.identifier ?? resource?.name
                    }
                />
            )}
            {isEditButtonVisible && (
                <EditButton
                    {...(isLoading ? { disabled: true } : {})}
                    resourceNameOrRouteName={
                        routerType === "legacy"
                            ? resource?.route
                            : resource?.identifier ?? resource?.name
                    }
                    recordItemId={id}
                />
            )}
            {isDeleteButtonVisible && (
                <DeleteButton
                    {...(isLoading ? { disabled: true } : {})}
                    resourceNameOrRouteName={
                        routerType === "legacy"
                            ? resource?.route
                            : resource?.identifier ?? resource?.name
                    }
                    recordItemId={id}
                    onSuccess={() => {
                        if (routerType === "legacy") {
                            legacyGoList(
                                resource?.route ?? resource?.name ?? "",
                            );
                        } else {
                            go({ to: goListPath });
                        }
                    }}
                    dataProviderName={dataProviderName}
                />
            )}
            <RefreshButton
                {...(isLoading ? { disabled: true } : {})}
                resourceNameOrRouteName={
                    routerType === "legacy"
                        ? resource?.route
                        : resource?.identifier ?? resource?.name
                }
                recordItemId={id}
                dataProviderName={dataProviderName}
            />
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
                        `${resource?.name}.titles.show`,
                        `Show ${userFriendlyResourceName(
                            resource?.meta?.label ??
                                resource?.options?.label ??
                                resource?.label ??
                                resource?.name,
                            "singular",
                        )}`,
                    )
                }
                extra={
                    <Space
                        key="extra-buttons"
                        wrap
                        {...(headerButtonProps ?? {})}
                    >
                        {headerButtons
                            ? typeof headerButtons === "function"
                                ? headerButtons({
                                      defaultButtons: defaultHeaderButtons,
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
                                      <Space
                                          key="footer-buttons"
                                          wrap
                                          {...footerButtonProps}
                                      >
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
