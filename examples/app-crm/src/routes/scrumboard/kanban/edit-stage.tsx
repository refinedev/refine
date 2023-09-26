import { useModalForm } from "@refinedev/antd";
import { useInvalidate, useNavigation } from "@refinedev/core";

import { Form, Input, Modal } from "antd";

export const KanbanEditStage = () => {
    const invalidate = useInvalidate();
    const { list } = useNavigation();
    const { formProps, modalProps, close } = useModalForm({
        action: "edit",
        defaultVisible: true,
        resource: "taskStages",
        meta: {
            fields: ["id", "title"],
        },
        onMutationSuccess: () => {
            invalidate({ invalidates: ["list"], resource: "tasks" });
        },
        successNotification: () => {
            return {
                key: "edit-stage",
                type: "success",
                message: "Successfully updated stage",
                description: "Successful",
            };
        },
    });

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close();
                list("tasks", "replace");
            }}
            title="Edit stage"
            width={512}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
