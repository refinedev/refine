import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Card, Button, Row, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { useOne, useUpdate, useTranslate, useMutationMode } from "@hooks";
import { BaseRecord } from "@interfaces";
import { MutationMode } from "../../../interfaces";
import { DeleteButton, RefreshButton, ListButton } from "@components";

export interface EditProps {
    resourceName: string;
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    mutationMode?: MutationMode;
}

export const Edit: React.FC<EditProps> = ({
    resourceName,
    title,
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    children,
}) => {
    const history = useHistory();
    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

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
                onSuccess: () => {
                    if (mutationMode === "pessimistic") {
                        return history.push(`/resources/${resourceName}`);
                    }
                },
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
                            <DeleteButton mutationMode={mutationMode} />
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
