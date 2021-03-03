import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Form, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { useCreate, useTranslate, useNotification } from "@hooks";
import { BaseRecord } from "@interfaces";

export interface CreateProps {
    resourceName: string;
    canEdit?: boolean;
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export const Create: React.FC<CreateProps> = ({
    resourceName,
    canEdit,
    title,
    actionButtons,
    saveButtonProps,
    children,
    onSuccess,
    onError,
}) => {
    const history = useHistory();
    const [form] = Form.useForm();

    const { mutate, isLoading } = useCreate(resourceName);
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
                        description: `New ${resourceName} created`,
                    });
                    if (canEdit) {
                        return history.push(
                            `/resources/${resourceName}/edit/${data.data.id}`,
                        );
                    }

                    return history.push(`/resources/${resourceName}`);
                },
                onError: (error: any) => {
                    if (onError) {
                        onError(error);
                        return;
                    }
                    notification.error({
                        message: "There is a problem",
                        description: error.message,
                    });
                },
            },
        );
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName,
                onFinish,
                form,
            });
        }
        return child;
    });

    return (
        <Card
            title={title ?? `Create ${pluralize.singular(resourceName)}`}
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
