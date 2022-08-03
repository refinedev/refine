import React from "react";
import {
    Card,
    CardProps,
    PageHeader,
    PageHeaderProps,
    Space,
    SpaceProps,
    Spin,
} from "antd";
import {
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    ResourceRouterParams,
    userFriendlyResourceName,
} from "@pankod/refine-core";

import {
    EditButton,
    DeleteButton,
    RefreshButton,
    ListButton,
    Breadcrumb,
} from "@components";
import { RefineCrudShowProps } from "@pankod/refine-ui-types";

export type ShowProps = RefineCrudShowProps<
    SpaceProps,
    SpaceProps,
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps,
    CardProps,
    {
        /**
         * @deprecated use `headerButtons` or `footerButtons` instead.
         */
        actionButtons?: React.ReactNode;
        /**
         * @deprecated use `headerProps`, `wrapperProps` and `contentProps` instead.
         */
        pageHeaderProps?: PageHeaderProps;
    }
>;

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
    actionButtons,
    isLoading = false,
    children,
    pageHeaderProps,
    resource: resourceFromProps,
    recordItemId,
    dataProviderName,
    breadcrumb,
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

    const defaultHeaderButtons = (
        <>
            {!recordItemId && (
                <ListButton resourceNameOrRouteName={resource.route} />
            )}
            {isEditButtonVisible && (
                <EditButton
                    disabled={isLoading}
                    resourceNameOrRouteName={resource.route}
                    recordItemId={id}
                />
            )}
            {isDeleteButtonVisible && (
                <DeleteButton
                    resourceNameOrRouteName={resource.route}
                    recordItemId={id}
                    onSuccess={() => list(resource.route ?? resource.name)}
                    dataProviderName={dataProviderName}
                />
            )}
            <RefreshButton
                resourceNameOrRouteName={resource.route}
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
                onBack={routeFromAction ? goBack : undefined}
                title={
                    title ??
                    translate(
                        `${resource.name}.titles.show`,
                        `Show ${userFriendlyResourceName(
                            resource.label ?? resource.name,
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
                {...(pageHeaderProps ?? {})}
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
                                : actionButtons
                                ? [actionButtons]
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
