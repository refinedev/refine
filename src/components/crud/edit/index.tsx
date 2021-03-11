import React from "react";
import { useHistory, useParams, Prompt } from "react-router-dom";
import { Form, Card, Button, Row, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { MutationMode } from "../../../interfaces";
import {
    useOne,
    useUpdate,
    useTranslate,
    useResourceWithRoute,
    useNotification,
    useMutationMode,
    useWarnAboutChange,
} from "@hooks";
import { BaseRecord, ResourceRouterParams } from "@interfaces";
import { DeleteButton, RefreshButton, ListButton } from "@components";

export interface EditProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    mutationMode?: MutationMode;
    onError?: () => void;
    onSuccess?: () => void;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
}

export const Edit: React.FC<EditProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    children,
    onSuccess,
    onError,
    submitOnEnter = true,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
}) => {
    const history = useHistory();
    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesContent,
    } = useWarnAboutChange();

    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesContent;

    const { id } = useParams<Record<string, string>>();

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

    const { mutate } = useUpdate(resource.name, mutationMode);
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
                        description: `Id:${idFromRoute} ${resource.name} edited`,
                    });

                    if (mutationMode === "pessimistic") {
                        return history.push(`/resources/${resource.route}`);
                    }
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
        !(mutationMode === "pessimistic") &&
            history.push(`/resources/${resource.route}`);
    };

    const onChangeValue = (changeValues: any) => {
        return changeValues;
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName: resource.name,
                form,
                onFinish,
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
