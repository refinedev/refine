import React from "react";

import { useCreateMany, useDelete, useList } from "@refinedev/core";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, ModalProps, Popconfirm } from "antd";

import { Text } from "@/components";
import { EventCategory } from "@/interfaces";

import styles from "./index.module.css";

type CalendarManageCategoriesProps = {
    saveSuccces?: () => void;
} & ModalProps;

export const CalendarManageCategories: React.FC<
    CalendarManageCategoriesProps
> = ({ saveSuccces, ...rest }) => {
    const [form] = Form.useForm();
    const { mutate: createManyMutation } = useCreateMany({
        mutationOptions: {
            meta: {
                fields: ["id", "title"],
            },
        },
    });
    const { mutate: deleteMutation } = useDelete();
    const { data } = useList<EventCategory>({
        resource: "eventCategories",
        meta: {
            fields: ["id", "title"],
        },
    });

    return (
        <Modal
            {...rest}
            title="Manage Categories"
            okText="Save"
            destroyOnClose
            bodyStyle={{ paddingTop: "1rem" }}
            okButtonProps={{
                onClick: () => {
                    form.submit();
                },
            }}
        >
            <div className={styles.container}>
                {data?.data.map((category) => (
                    <div key={category.id} className={styles.category}>
                        <Text className={styles.title}>{category.title}</Text>
                        <Popconfirm
                            title="Delete the category"
                            description="Are you sure to delete this category?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                deleteMutation({
                                    resource: "eventCategories",
                                    id: category.id,
                                    successNotification: () => ({
                                        key: "event-category-delete",
                                        message:
                                            "Successfully deleted category",
                                        description: "Successful",
                                        type: "success",
                                    }),
                                });
                            }}
                        >
                            <Button
                                type="text"
                                icon={<DeleteOutlined className="tertiary" />}
                            />
                        </Popconfirm>
                    </div>
                ))}

                <Form
                    form={form}
                    onFinish={(formValues: { title: string[] }) => {
                        if (
                            !formValues?.title ||
                            formValues.title.length === 0
                        ) {
                            return saveSuccces?.();
                        }

                        // remove undefined values
                        formValues.title = formValues.title.filter(
                            (title) => title !== undefined,
                        );

                        const values = formValues.title.map((title) => ({
                            title,
                        }));

                        createManyMutation(
                            {
                                resource: "eventCategories",
                                meta: {
                                    fields: ["id", "title"],
                                },
                                values,
                                successNotification: () => ({
                                    key: "event-category-create",
                                    message: "Successfully created categories",
                                    description: "Successful",
                                    type: "success",
                                }),
                            },
                            {
                                onSuccess: () => {
                                    saveSuccces?.();
                                    form.resetFields();
                                },
                            },
                        );
                    }}
                >
                    <Form.List name="title">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <div
                                        key={field.key}
                                        className={styles.category}
                                    >
                                        <Form.Item required={false} noStyle>
                                            <Form.Item {...field} noStyle>
                                                <Input
                                                    className={
                                                        styles[
                                                            "new-category-input"
                                                        ]
                                                    }
                                                    placeholder="Please enter category title"
                                                    bordered={false}
                                                />
                                            </Form.Item>
                                        </Form.Item>
                                        <Button
                                            type="text"
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                            icon={
                                                <DeleteOutlined className="tertiary" />
                                            }
                                        />
                                    </div>
                                ))}

                                <div className={styles.category}>
                                    <Button
                                        type="link"
                                        icon={<PlusOutlined />}
                                        onClick={() => {
                                            add();
                                        }}
                                        className={
                                            styles["new-category-button"]
                                        }
                                    >
                                        Add category
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>
        </Modal>
    );
};
