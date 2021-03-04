import React from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { Form, Card, Button, Row, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { useOne, useUpdate, useTranslate, useResourceWithRoute } from "@hooks";
import { BaseRecord, MatchRoute } from "@interfaces";
import { DeleteButton, RefreshButton, ListButton } from "@components";

export interface EditProps {
    resourceName: string;
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
}

export const Edit: React.FC<EditProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    children,
}) => {
    const history = useHistory();

    const [form] = Form.useForm();

    const match = useRouteMatch({
        path: [
            "/resources/:resourceName/:action/:id",
            "/resources/:resourceName",
            "/*",
        ],
    });

    const {
        params: { resourceName: routeResourceName, id },
    } = (match as unknown) as MatchRoute;

    const resource = useResourceWithRoute(routeResourceName);

    const { data, isLoading } = useOne(resource.name, id);

    React.useEffect(() => {
        form.setFieldsValue({
            ...data?.data,
        });
    }, [data]);

    const { mutate } = useUpdate(resource.name);
    const translate = useTranslate();

    const onFinish = async (values: BaseRecord): Promise<void> => {
        mutate(
            { id, values },
            {
                onSuccess: () => {
                    return history.push(`/resources/${resource.route}`);
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
