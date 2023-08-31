import { useNavigate } from "react-router-dom";
import { useInvalidate } from "@refinedev/core";
import { useModalForm } from "@refinedev/antd";
import { Form, Input, Modal } from "antd";

export const SalesEditStage = () => {
    const invalidate = useInvalidate();
    const navigate = useNavigate();

    const { formProps, modalProps, close } = useModalForm({
        action: "edit",
        defaultVisible: true,
        resource: "dealStages",
        meta: {
            fields: ["id", "title"],
        },
        onMutationSuccess: () => {
            invalidate({ invalidates: ["list"], resource: "deals" });
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
                navigate("/scrumboard/sales", { replace: true });
                close();
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
