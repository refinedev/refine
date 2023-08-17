import { useParsed } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import { Avatar, Form, Input } from "antd";

import { TaskComment } from "../interfaces/graphql";

export const KanbanCommentForm = () => {
    const { id: taskId } = useParsed();

    const { formProps, onFinish, form } = useForm<TaskComment>({
        action: "create",
        resource: "taskComment",
        queryOptions: {
            enabled: false,
        },
        redirect: false,
    });

    const handleOnFinish = async (values: any) => {
        try {
            await onFinish({
                ...values,
                taskId,
            });

            form.resetFields();
        } catch (error) {}
    };

    return (
        <div style={{ display: "flex", gap: "12px" }}>
            <Avatar />
            <Form
                {...formProps}
                style={{ width: "100%" }}
                onFinish={handleOnFinish}
            >
                <Form.Item name="comment" noStyle>
                    <Input placeholder="Write a comment" />
                </Form.Item>
            </Form>
        </div>
    );
};
