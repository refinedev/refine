import React, { ReactNode } from "react";
import {
    Card,
    Space,
    PageHeader,
    PageHeaderProps,
    Spin,
    SpaceProps,
    CardProps,
} from "antd";
import {
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    userFriendlyResourceName,
    ResourceRouterParams,
    useRefineContext,
} from "@pankod/refine-core";
import { RefineCrudCreateProps } from "@pankod/refine-ui-types";

import { Breadcrumb, SaveButton } from "@components";
import { SaveButtonProps } from "@components/buttons/save";

export type CreateProps = RefineCrudCreateProps<
    SaveButtonProps,
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
         * Action buttons node at the top of the view
         * @default `<SaveButton />`
         *
         * @deprecated use `headerButtons` or `footerButtons` instead.
         */
        actionButtons?: React.ReactNode;
        /**
         * Additional props to be passed to the `PageHeader` component
         *
         * @deprecated use `headerProps`, `wrapperProps` and `contentProps` instead.
         */
        pageHeaderProps?: PageHeaderProps;
    }
>;

/**
 * `<Create>` provides us a layout to display the page.
 * It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/create} for more details.
 */
export const Create: React.FC<CreateProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    children,
    pageHeaderProps,
    resource: resourceFromProps,
    isLoading = false,
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
    const { goBack } = useNavigation();
    const translate = useTranslate();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, action: routeFromAction } =
        useParams<ResourceRouterParams>();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const { options } = useRefineContext();
    const breadcrumb: ReactNode =
        typeof breadcrumbFromProps === "undefined"
            ? options?.breadcrumb
            : breadcrumbFromProps;

    const defaultFooterButtons = (
        <>
            {actionButtons ?? (
                <SaveButton
                    {...(isLoading ? { disabled: true } : {})}
                    {...saveButtonProps}
                    htmlType="submit"
                />
            )}
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
                        `${resource.name}.titles.create`,
                        `Create ${userFriendlyResourceName(
                            resource.label ?? resource.name,
                            "singular",
                        )}`,
                    )
                }
                breadcrumb={
                    typeof breadcrumb !== "undefined" ? (
                        <>{breadcrumb}</> ?? undefined
                    ) : (
                        <Breadcrumb />
                    )
                }
                extra={
                    <Space wrap {...(headerButtonProps ?? {})}>
                        {headerButtons
                            ? typeof headerButtons === "function"
                                ? headerButtons({
                                      defaultButtons: null,
                                  })
                                : headerButtons
                            : null}
                    </Space>
                }
                {...(pageHeaderProps ?? {})}
                {...(headerProps ?? {})}
            >
                <Spin spinning={isLoading}>
                    <Card
                        bordered={false}
                        actions={[
                            <Space
                                key="action-buttons"
                                style={{ float: "right", marginRight: 24 }}
                                {...(footerButtonProps ?? {})}
                            >
                                {footerButtons
                                    ? typeof footerButtons === "function"
                                        ? footerButtons({
                                              defaultButtons:
                                                  defaultFooterButtons,
                                          })
                                        : footerButtons
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
