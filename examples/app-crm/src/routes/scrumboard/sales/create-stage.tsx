import { useModalForm } from "@refinedev/antd";
import { useInvalidate, useNavigation } from "@refinedev/core";

import { Form, Input, Modal } from "antd";

import { SALES_CREATE_DEAL_STAGE_MUTATION } from "./queries";

export const SalesCreateStage = () => {
    const invalidate = useInvalidate();
    const { list } = useNavigation();
    const { formProps, modalProps, close } = useModalForm({
        action: "create",
        defaultVisible: true,
        resource: "dealStages",
        meta: {
            gqlMutation: SALES_CREATE_DEAL_STAGE_MUTATION,
        },
        onMutationSuccess: () => {
            invalidate({ invalidates: ["list"], resource: "deals" });
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
                list("deals", "replace");
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
