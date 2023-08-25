import { useModalForm } from "@refinedev/antd";
import { useInvalidate } from "@refinedev/core";
import { Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";

export const SalesCreateStage = () => {
    const invalidate = useInvalidate();
    const navigate = useNavigate();
    const { formProps, modalProps, close } = useModalForm({
        action: "create",
        defaultVisible: true,
        meta: {
            operation: "dealStage",
            fields: ["id"],
        },
        onMutationSuccess: () => {
            invalidate({ invalidates: ["list"], resource: "deals" });
        },
    });

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close();
                navigate("/scrumboard/sales", { replace: true });
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
