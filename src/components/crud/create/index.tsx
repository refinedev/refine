import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Card, Button, Form, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { useCreate, useResourceWithRoute, useTranslate } from "@hooks";
import { BaseRecord, MatchRoute } from "@interfaces";

export interface CreateProps {
    canEdit?: boolean;
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
}

export const Create: React.FC<CreateProps> = ({
    canEdit,
    title,
    actionButtons,
    saveButtonProps,
    children,
}) => {
    const history = useHistory();

    const match = useRouteMatch({
        path: ["/resources/:resourceName", "/*"],
    });

    const {
        params: { resourceName: routeResourceName },
    } = (match as unknown) as MatchRoute;

    const resource = useResourceWithRoute(routeResourceName);

    const [form] = Form.useForm();

    const { mutate, isLoading } = useCreate(resource.name);

    const translate = useTranslate();

    const onFinish = async (values: BaseRecord): Promise<void> => {
        mutate(
            { values },
            {
                onSuccess: (data) => {
                    if (canEdit) {
                        return history.push(
                            `/resources/${resource.route}/edit/${data.data.id}`,
                        );
                    }

                    return history.push(`/resources/${resource.route}`);
                },
            },
        );
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName: resource.name,
                onFinish,
                form,
            });
        }
        return child;
    });

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
                            disabled={isLoading}
                            type="primary"
                            icon={<SaveOutlined />}
                            onClick={(): void => form.submit()}
                            {...saveButtonProps}
                        >
                            {translate("common:buttons.save", "Save")}
                        </Button>
                    )}
                </Space>,
            ]}
        >
            {childrenWithProps}
        </Card>
    );
};
