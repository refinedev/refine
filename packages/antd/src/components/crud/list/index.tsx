import React from "react";
import { Space } from "antd";
import {
    useTranslate,
    userFriendlyResourceName,
    useRefineContext,
    useRouterType,
    useResource,
} from "@pankod/refine-core";

import { Breadcrumb, CreateButton, PageHeader } from "@components";
import { ListProps } from "../types";

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
    createButtonProps,
    resource: resourceFromProps,
    wrapperProps,
    contentProps,
    headerProps,
    breadcrumb: breadcrumbFromProps,
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
        ((resource?.canCreate ?? !!resource?.create) || createButtonProps);

    const breadcrumb =
        typeof breadcrumbFromProps === "undefined"
            ? globalBreadcrumb
            : breadcrumbFromProps;

    const defaultExtra = isCreateButtonVisible ? (
        <CreateButton
            size="middle"
            resourceNameOrRouteName={
                routerType === "legacy"
                    ? resource?.route
                    : resource?.identifier ?? resource?.name
            }
            {...createButtonProps}
        />
    ) : null;

    return (
        <div {...(wrapperProps ?? {})}>
            <PageHeader
                ghost={false}
                title={
                    title ??
                    translate(
                        `${resource?.name}.titles.list`,
                        userFriendlyResourceName(
                            resource?.meta?.label ??
                                resource?.options?.label ??
                                resource?.label ??
                                resource?.name,
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
