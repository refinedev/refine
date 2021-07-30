import React from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    Space,
    ButtonProps,
    PageHeader,
    PageHeaderProps,
    Tag,
    Spin,
} from "antd";

import { useNavigation, useResourceWithRoute, useTranslate } from "@hooks";
import { SaveButton } from "@components";
import { userFriendlyResourceName } from "@definitions";
import { ResourceRouterParams } from "../../../interfaces";

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
 * @see {@link https://refine.dev/docs/api-references/components/basic-views/create} for more details.
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

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const tags = [];
    if (idFromRoute) {
        tags.push(
            <Tag
                key={`${resource.name}-${idFromRoute}-create-clone-tag`}
                color="blue"
            >
                {translate("tags.clone", "Clone")}
            </Tag>,
        );
    }

    return (
        <PageHeader
            ghost={false}
            onBack={routeFromAction ? goBack : undefined}
            tags={tags}
            title={
                title ??
                translate(
                    `${resource.name}.titles.create`,
                    `Create ${userFriendlyResourceName(
                        resource.name,
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
