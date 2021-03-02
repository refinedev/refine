import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Card, Button, Row, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { useOne, useUpdate, useTranslate, useNotification } from "@hooks";
import { BaseRecord } from "@interfaces";
import { DeleteButton, RefreshButton, ListButton } from "@components";

export interface EditProps {
    resourceName: string;
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    onErrorActions?: () => void;
    onSuccessActions?: () => void;
}

export const Edit: React.FC<EditProps> = ({
    resourceName,
    title,
    actionButtons,
    saveButtonProps,
    children,
    onSuccessActions,
    onErrorActions,
}) => {
    const history = useHistory();
    const { id } = useParams<Record<string, string>>();

    const [form] = Form.useForm();

    const { data, isLoading } = useOne(resourceName, id);

    React.useEffect(() => {
        form.setFieldsValue({
            ...data?.data,
        });
    }, [data]);

    const { mutate } = useUpdate(resourceName);
    const translate = useTranslate();
    const notification = useNotification();

    const onFinish = async (values: BaseRecord): Promise<void> => {
        mutate(
            { id, values },
            {
                onSuccess: () => {
                    if (onSuccessActions) {
                        return onSuccessActions();
                    }
                    notification.success({
                        message: "Successful",
                        description: `Id:${id} ${resourceName} edited`,
                    });
                    return history.push(`/resources/${resourceName}`);
                },
                onError: (err: any) => {
                    if (onErrorActions) {
                        return onErrorActions();
                    }
                    notification.error({
                        message: "There is a problem",
                        description: err.message,
                    });
                },
            },
        );
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName,
                form,
                onFinish,
            });
        }
        return child;
    });

    return (
        <Card
            title={title ?? `Edit ${pluralize.singular(resourceName)}`}
            extra={
                <Row>
                    <Space>
                        <ListButton resourceName={resourceName} />
                        <RefreshButton resourceName={resourceName} />
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
