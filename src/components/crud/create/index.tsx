import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Button, Form, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import {
    useCreate,
    useResourceWithRoute,
    useTranslate,
    useNotification,
} from "@hooks";
import { BaseRecord, ResourceRouterParams } from "@interfaces";

export interface CreateProps {
    canEdit?: boolean;
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    submitOnEnter?: boolean;
}

export const Create: React.FC<CreateProps> = ({
    canEdit,
    title,
    actionButtons,
    saveButtonProps,
    children,
    onSuccess,
    onError,
    submitOnEnter,
}) => {
    const history = useHistory();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);

    const [form] = Form.useForm();

    const { mutate, isLoading } = useCreate(resource.name);

    const notification = useNotification();

    const translate = useTranslate();

    const onFinish = async (values: BaseRecord): Promise<void> => {
        mutate(
            { values },
            {
                onSuccess: (data) => {
                    if (onSuccess) {
                        onSuccess(data);
                        return;
                    }

                    notification.success({
                        message: "Successful",
                        description: `New ${resource.name} created!`,
                    });

                    if (canEdit) {
                        return history.push(
                            `/resources/${resource.route}/edit/${data.data.id}`,
                        );
                    }

                    return history.push(`/resources/${resource.route}`);
                },
                onError: (error: any) => {
                    if (onError) {
                        onError(error);
                        return;
                    }

                    notification.error({
                        message: `There was an error creating it ${resource.name}!`,
                        description: error.message,
                    });
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

    const type = submitOnEnter ? "submit" : "button";

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
                            htmlType={type}
                            disabled={isLoading}
                            type="primary"
                            icon={<SaveOutlined />}
                            onClick={(e): void =>
                                submitOnEnter
                                    ? form.submit()
                                    : e.preventDefault()
                            }
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
