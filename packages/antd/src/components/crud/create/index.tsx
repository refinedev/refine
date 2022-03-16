import React from "react";
import {
    Card,
    Space,
    ButtonProps,
    PageHeader,
    PageHeaderProps,
    Tag,
    Spin,
} from "antd";
import {
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";

import { SaveButton } from "@components";

export interface CreateProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    pageHeaderProps?: PageHeaderProps;
    resource?: string;
    isLoading?: boolean;
}

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
}) => {
    const { goBack } = useNavigation();
    const translate = useTranslate();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, action: routeFromAction } =
        useParams<ResourceRouterParams>();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    return (
        <PageHeader
            ghost={false}
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
            {...pageHeaderProps}
        >
            <Spin spinning={isLoading}>
                <Card
                    bordered={false}
                    actions={[
                        <Space
                            key="action-buttons"
                            style={{ float: "right", marginRight: 24 }}
                        >
                            {actionButtons ?? (
                                <SaveButton
                                    {...saveButtonProps}
                                    htmlType="submit"
                                />
                            )}
                        </Space>,
                    ]}
                >
                    {children}
                </Card>
            </Spin>
        </PageHeader>
    );
};
