import React from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { useResourceWithRoute, useTranslate } from "@hooks";
import { ResourceRouterParams } from "@interfaces";

export interface CreateProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
}

export const Create: React.FC<CreateProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    children,
}) => {
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);

    const translate = useTranslate();

    return (
        <Card
            title={
                title ??
                translate(
                    `common:resources.${resource.name}.Create`,
                    `Create ${pluralize.singular(resource.name)}`,
                )
            }
            actions={[
                <Space
                    key="action-buttons"
                    style={{ float: "right", marginRight: 24 }}
                >
                    {actionButtons ?? (
                        <Button
                            htmlType="submit"
                            type="primary"
                            icon={<SaveOutlined />}
                            {...saveButtonProps}
                        >
                            {translate("common:buttons.save", "Save")}
                        </Button>
                    )}
                </Space>,
            ]}
        >
            {children}
        </Card>
    );
};
