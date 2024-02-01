import { useEffect } from "react";

import { useForm } from "@refinedev/antd";
import { HttpError, useInvalidate } from "@refinedev/core";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";

import { Task, TaskUpdateInput } from "@/graphql/schema.types";

import { KANBAN_UPDATE_TASK_MUTATION } from "../../kanban/queries";
import { AccordionHeaderSkeleton, ChecklistHeader, CheckListInput } from "../";

type Props = {
    initialValues: {
        checklist?: Task["checklist"];
    };
    isLoading?: boolean;
};

export const CheckListForm = ({ initialValues, isLoading }: Props) => {
    const invalidate = useInvalidate();
    const { formProps } = useForm<Task, HttpError, TaskUpdateInput>({
        queryOptions: {
            enabled: false,
        },
        redirect: false,
        autoSave: {
            enabled: true,
            onFinish: (values) => {
                return {
                    ...values,
                    checklist: values.checklist?.filter(Boolean),
                };
            },
        },
        successNotification: false,
        onMutationSuccess: () => {
            invalidate({ invalidates: ["list"], resource: "tasks" });
        },
        meta: {
            gqlMutation: KANBAN_UPDATE_TASK_MUTATION,
        },
    });

    useEffect(() => {
        formProps.form?.setFieldsValue(initialValues);
    }, [initialValues.checklist]);

    if (isLoading) {
        return <AccordionHeaderSkeleton />;
    }

    return (
        <div
            style={{ padding: "12px 24px", borderBottom: "1px solid #d9d9d9" }}
        >
            <ChecklistHeader
                checklist={
                    formProps.form?.getFieldValue("checklist") ??
                    initialValues.checklist
                }
            />
            <div
                style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "8px",
                    marginLeft: "30px",
                }}
            >
                <Form {...formProps} initialValues={initialValues}>
                    <Form.List name="checklist">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <div
                                        key={field.key}
                                        style={{
                                            display: "flex",
                                            flex: 1,
                                            alignItems: "center",
                                            padding: "8px",
                                            borderBottom: "1px solid #d9d9d9",
                                        }}
                                    >
                                        <Form.Item
                                            {...field}
                                            noStyle
                                            name={[field.name]}
                                        >
                                            <CheckListInput />
                                        </Form.Item>
                                        <Button
                                            type="text"
                                            size="small"
                                            onClick={() => remove(field.name)}
                                            style={{ opacity: "0.15" }}
                                            icon={<DeleteOutlined />}
                                        />
                                    </div>
                                ))}
                                <Form.Item noStyle>
                                    <Button
                                        type="link"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                        style={{
                                            textAlign: "left",
                                            marginTop: "8px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Add item
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>
        </div>
    );
};
