import { useModalForm } from "@refinedev/antd";
import { useInvalidate, useNavigation } from "@refinedev/core";
import { GetFields } from "@refinedev/nestjs-query";

import { Form, Input, Modal } from "antd";

import { KanbanUpdateStageMutation } from "@/graphql/types";

import { KANBAN_UPDATE_STAGE_MUTATION } from "./queries";

export const KanbanEditStage = () => {
    const invalidate = useInvalidate();
    const { list } = useNavigation();
    const { formProps, modalProps, close } = useModalForm<
        GetFields<KanbanUpdateStageMutation>
    >({
        action: "edit",
        defaultVisible: true,
        resource: "taskStages",
        meta: {
            gqlMutation: KANBAN_UPDATE_STAGE_MUTATION,
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
