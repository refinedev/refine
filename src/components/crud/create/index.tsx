import React from "react";
import { useHistory, useParams, Prompt } from "react-router-dom";
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
    warnWhenUnsavedChanges?: boolean;
}

export const Create: React.FC<CreateProps> = ({
    canEdit,
    title,
    actionButtons,
    saveButtonProps,
    children,
    onSuccess,
    onError,
    submitOnEnter = true,
    warnWhenUnsavedChanges = false,
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

    const onChangeValue = (changeValues: any) => {
        return changeValues;
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName: resource.name,
                onFinish,
                form,
                onKeyUp: (event: any) => {
                    if (submitOnEnter && event.keyCode === 13) {
                        form.submit();
                    }
                },
                onValuesChange: onChangeValue,
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
            <>
                {warnWhenUnsavedChanges && (
                    <Prompt
                        when={!!onChangeValue}
                        message="Are you sure you want to leave? You have with unsaved changes."
                    />
                )}
                {childrenWithProps}
            </>
        </Card>
    );
};
