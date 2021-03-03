import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Card, Button, Row, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { useOne, useUpdate, useTranslate } from "@hooks";
import { BaseRecord, MutationMode } from "@interfaces";
import { ListButton, RefreshButton } from "@components/buttons";
export interface EditProps {
    resourceName: string;
    title?: string;
    saveButtonProps?: ButtonProps;
    mutationMode?: MutationMode;
}

export const Edit: React.FC<EditProps> = ({
    resourceName,
    title,
    saveButtonProps,
    mutationMode = "pessimistic",
    children,
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

    const { mutate } = useUpdate(resourceName, mutationMode);
    const translate = useTranslate();

    const onFinish = async (values: BaseRecord): Promise<void> => {
        mutate(
            { id, values },
            {
                onSuccess:
                    mutationMode === "pessimistic"
                        ? () => {
                              return history.push(`/resources/${resourceName}`);
                          }
                        : undefined,
            },
        );
        !(mutationMode === "pessimistic") &&
            history.push(`/resources/${resourceName}`);
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
                    </Space>
                </Row>
            }
        >
            {childrenWithProps}
        </Card>
    );
};
