import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Card, Button, Row, Space } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { useOne, useUpdate } from "@hooks";
import { BaseRecord } from "@interfaces";
import { DeleteButton, RefreshButton, ListButton } from "@components";

export interface EditProps {
    resourceName: string;
    title?: string;
}

export const Edit: React.FC<EditProps> = ({
    resourceName,
    title,
    children,
}) => {
    const history = useHistory();
    const { id } = useParams<Record<string, string>>();

    const [form] = Form.useForm();

    const { data, isLoading } = useOne(resourceName, id);

    form.setFieldsValue({
        ...data?.data,
    });

    const { mutate } = useUpdate(resourceName);

    const onFinish = async (values: BaseRecord): Promise<void> => {
        mutate(
            { id, values },
            {
                onSuccess: () => {
                    return history.push(`/resources/${resourceName}`);
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
                    key="footer-buttons"
                    style={{ float: "right", marginRight: 24 }}
                >
                    <DeleteButton
                        resourceName={resourceName}
                        recordItemId={id}
                    />
                    <Button
                        htmlType="submit"
                        disabled={isLoading}
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={(): void => form.submit()}
                    >
                        Save
                    </Button>
                </Space>,
            ]}
        >
            {childrenWithProps}
        </Card>
    );
};
