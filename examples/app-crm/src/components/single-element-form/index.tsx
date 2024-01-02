import React from "react";

import type { UseFormProps } from "@refinedev/antd";
import { useForm } from "@refinedev/antd";

import { EditOutlined } from "@ant-design/icons";
import type { FormItemProps, FormProps } from "antd";
import { Button, Form, Skeleton } from "antd";

import { Text } from "../text";
import styles from "./index.module.css";

type SingleElementFormProps = {
    icon?: React.ReactNode;
    itemProps?: FormItemProps;
    extra?: React.ReactNode;
    view?: React.ReactNode;
    state?: "empty" | "form" | "view";
    onUpdate?: () => void;
    onCancel?: () => void;
    onClick?: () => void;
    loading?: boolean;
    style?: React.CSSProperties;
    useFormProps?: UseFormProps;
    formProps?: FormProps;
} & React.PropsWithChildren;

export const SingleElementForm: React.FC<SingleElementFormProps> = ({
    state = "view",
    view,
    icon,
    itemProps,
    onClick,
    onUpdate,
    onCancel,
    loading,
    children,
    style,
    extra,
    useFormProps,
    formProps: formPropsFromProp,
}) => {
    const { formProps, saveButtonProps } = useForm({
        action: "edit",
        redirect: false,
        autoSave: {
            enabled: false,
        },
        queryOptions: {
            enabled: false,
        },
        onMutationSuccess() {
            onUpdate?.();
        },
        mutationMode: "optimistic",
        ...useFormProps,
    });

    return (
        <Form layout="vertical" {...formProps} {...formPropsFromProp}>
            <div className={styles.container} style={style}>
                <div className={styles.icon}>{icon}</div>
                <div className={styles.content}>
                    <div className={styles.input}>
                        <Text
                            size="sm"
                            type="secondary"
                            className={styles.label}
                        >
                            {itemProps?.label}
                        </Text>
                        {loading && (
                            <Skeleton.Input
                                className={styles.skeleton}
                                size="small"
                                active
                            />
                        )}
                        {state === "form" && !loading && (
                            <div className={styles.formItem}>
                                <Form.Item {...itemProps} noStyle>
                                    {children}
                                </Form.Item>
                                {extra}
                            </div>
                        )}
                        {state === "empty" && !loading && (
                            <Button
                                onClick={onClick}
                                type="link"
                                size="small"
                                style={{ padding: 0 }}
                            >
                                Add {itemProps?.label}
                            </Button>
                        )}
                        {state === "view" && view}
                    </div>

                    {state === "form" && (
                        <div className={styles.buttons}>
                            <Button onClick={() => onCancel?.()}>Cancel</Button>
                            <Button type="primary" {...saveButtonProps}>
                                Save
                            </Button>
                        </div>
                    )}
                </div>

                {state === "view" && (
                    <div className={styles.actions}>
                        <Button onClick={onClick} icon={<EditOutlined />} />
                    </div>
                )}
            </div>
        </Form>
    );
};
