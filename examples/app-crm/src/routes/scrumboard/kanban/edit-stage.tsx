import { useNavigate } from "react-router-dom";
import { useGetToPath, useInvalidate } from "@refinedev/core";
import { useModalForm } from "@refinedev/antd";
import { Form, Input, Modal } from "antd";

export const KanbanEditStage = () => {
    const invalidate = useInvalidate();
    const navigate = useNavigate();
    const getToPath = useGetToPath();
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
                navigate(
                    getToPath({
                        action: "list",
                    }) ?? "",
                    {
                        replace: true,
                    },
                );
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
