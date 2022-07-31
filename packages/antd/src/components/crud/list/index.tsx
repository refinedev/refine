import React from "react";
import { PageHeader, PageHeaderProps, Space, SpaceProps } from "antd";
import {
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";

import { Breadcrumb, CreateButton, CreateButtonProps } from "@components";
import { RefineCrudListProps } from "@pankod/refine-ui-types";

export type ListProps = RefineCrudListProps<
    CreateButtonProps,
    SpaceProps,
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps,
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    {
        /**
         * @deprecated use `headerProps`, `wrapperProps` and `contentProps` instead.
         */
        pageHeaderProps?: PageHeaderProps;
    }
>;

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
    pageHeaderProps,
    resource: resourceFromProps,
    wrapperProps,
    contentProps,
    headerProps,
    breadcrumb,
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

    const defaultExtra = isCreateButtonVisible ? (
        <CreateButton
            size="middle"
            resourceNameOrRouteName={resource.route}
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
                        `${resource.name}.titles.list`,
                        userFriendlyResourceName(
                            resource.label ?? resource.name,
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
                {...(pageHeaderProps ?? {})}
                {...(headerProps ?? {})}
            >
                <div {...(contentProps ?? {})}>{children}</div>
            </PageHeader>
        </div>
    );
};
