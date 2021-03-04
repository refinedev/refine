import React from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { Form, Card, Button, Row, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import {
    useOne,
    useUpdate,
    useTranslate,
    useResourceWithRoute,
    useNotification,
} from "@hooks";
import { BaseRecord, ResourceRouterParams } from "@interfaces";
import { DeleteButton, RefreshButton, ListButton } from "@components";

export interface EditProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    onError?: () => void;
    onSuccess?: () => void;
}

export const Edit: React.FC<EditProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    children,
    onSuccess,
    onError,
}) => {
    const history = useHistory();

    const [form] = Form.useForm();

    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);

    const { data, isLoading } = useOne(resource.name, idFromRoute);

    React.useEffect(() => {
        form.setFieldsValue({
            ...data?.data,
        });
    }, [data]);

    const { mutate } = useUpdate(resource.name);
    const translate = useTranslate();
    const notification = useNotification();

    const onFinish = async (values: BaseRecord): Promise<void> => {
        mutate(
            { id: idFromRoute, values },
            {
                onSuccess: () => {
                    if (onSuccess) {
                        return onSuccess();
                    }

                    notification.success({
                        message: "Successful",
                        description: `Id:$ {id} ${resource.name} edited`,
                    });

                    return history.push(`/resources/${resource.route}`);
                },
                onError: (err: any) => {
                    if (onError) {
                        return onError();
                    }

                    notification.error({
                        message: `There was an error updating it ${resource.name}!`,
                        description: err.message,
                    });
                },
            },
        );
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName: resource.name,
                form,
                onFinish,
            });
        }
        return child;
    });

    return (
        <Card
            title={title ?? `Edit ${pluralize.singular(resource.name)}`}
            extra={
                <Row>
                    <Space>
                        <ListButton />
                        <RefreshButton />
                    </Space>
                </Row>
            }
            actions={[
                <Space
                    key="action-buttons"
                    style={{ float: "right", marginRight: 24 }}
                >
                    {actionButtons ?? (
                        <>
                            <DeleteButton />
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
                        </>
                    )}
                </Space>,
            ]}
        >
            {childrenWithProps}
        </Card>
    );
};
