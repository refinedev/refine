import { useModalForm } from "@refinedev/antd";
import { useInvalidate } from "@refinedev/core";
import { Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";

export const KanbanCreateStage = () => {
    const invalidate = useInvalidate();
    const navigate = useNavigate();
    const { formProps, modalProps, close } = useModalForm({
        action: "create",
        defaultVisible: true,
        resource: "taskStages",
        meta: {
            fields: ["id"],
        },
        onMutationSuccess: () => {
            invalidate({ invalidates: ["list"], resource: "tasks" });
        },
        successNotification: () => {
            return {
                key: "create-stage",
                type: "success",
                message: "Successfully created stage",
                description: "Successful",
            };
        },
    });

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close();
                navigate("/scrumboard/kanban", { replace: true });
            }}
            title="Add new stage"
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
