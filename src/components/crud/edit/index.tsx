import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Card, Button } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { useOne, useUpdate, useTranslate } from "@hooks";
import { BaseRecord } from "@interfaces";

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
    const translate = useTranslate();

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
                <Button
                    htmlType="submit"
                    disabled={isLoading}
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={(): void => form.submit()}
                >
                    {translate("common:buttons.save", "Save")}
                </Button>
            }
        >
            {childrenWithProps}
        </Card>
    );
};
