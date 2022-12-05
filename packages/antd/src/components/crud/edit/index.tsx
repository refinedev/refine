import React from "react";

import { Card, Space, PageHeader, Spin } from "antd";
import {
    useResourceWithRoute,
    useMutationMode,
    useNavigation,
    useTranslate,
    useRouterContext,
    userFriendlyResourceName,
    ResourceRouterParams,
    useRefineContext,
} from "@pankod/refine-core";

import {
    DeleteButton,
    RefreshButton,
    ListButton,
    SaveButton,
    Breadcrumb,
} from "@components";
import { EditProps } from "../types";

/**
 * `<Edit>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/edit} for more details.
 */
export const Edit: React.FC<EditProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    recordItemId,
    children,
    deleteButtonProps,
    pageHeaderProps,
    canDelete,
    resource: resourceFromProps,
    isLoading = false,
    dataProviderName,
    breadcrumb: breadcrumbFromProps,
    wrapperProps,
    headerProps,
    contentProps,
    headerButtonProps,
    headerButtons,
    footerButtonProps,
    footerButtons,
    goBack: goBackFromProps,
}) => {
    const translate = useTranslate();
    const { goBack, list } = useNavigation();
    const resourceWithRoute = useResourceWithRoute();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { useParams } = useRouterContext();

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);
    const isDeleteButtonVisible =
        canDelete ?? (resource.canDelete || deleteButtonProps);

    const { options } = useRefineContext();
    const breadcrumb =
        typeof breadcrumbFromProps === "undefined"
            ? options?.breadcrumb
            : breadcrumbFromProps;

    const id = recordItemId ?? idFromRoute;

    const defaultHeaderButtons = (
        <>
            {!recordItemId && (
                <ListButton
                    {...(isLoading ? { disabled: true } : {})}
                    resourceNameOrRouteName={resource.route}
                />
            )}
            <RefreshButton
                {...(isLoading ? { disabled: true } : {})}
                resourceNameOrRouteName={resource.route}
                recordItemId={id}
                dataProviderName={dataProviderName}
            />
        </>
    );

    const defaultFooterButtons = (
        <>
            {isDeleteButtonVisible && (
                <DeleteButton
                    {...(isLoading ? { disabled: true } : {})}
                    mutationMode={mutationMode}
                    onSuccess={() => {
                        list(resource.route ?? resource.name);
                    }}
                    dataProviderName={dataProviderName}
                    {...deleteButtonProps}
                />
            )}
            <SaveButton
                {...(isLoading ? { disabled: true } : {})}
                {...saveButtonProps}
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
                        `${resource.name}.titles.edit`,
                        `Edit ${userFriendlyResourceName(
                            resource.label ?? resource.name,
                            "singular",
                        )}`,
                    )
                }
                extra={
                    <Space wrap {...(headerButtonProps ?? {})}>
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
                        actions={[
                            <Space
                                key="footer-buttons"
                                wrap
                                style={{
                                    float: "right",
                                    marginRight: 24,
                                }}
                                {...(footerButtonProps ?? {})}
                            >
                                {footerButtons
                                    ? typeof footerButtons === "function"
                                        ? footerButtons({
                                              defaultButtons:
                                                  defaultFooterButtons,
                                          })
                                        : footerButtons
                                    : actionButtons
                                    ? actionButtons
                                    : defaultFooterButtons}
                            </Space>,
                        ]}
                        {...(contentProps ?? {})}
                    >
                        {children}
                    </Card>
                </Spin>
            </PageHeader>
        </div>
    );
};
