import { useSearchParams } from "react-router-dom";

import { useModalForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import { Form, Input, Modal } from "antd";

export const KanbanCreatePage = () => {
    const [searchParams] = useSearchParams();
    const { list } = useNavigation();
    const { formProps, modalProps, close } = useModalForm({
        action: "create",
        defaultVisible: true,
    });

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close();
                list("tasks", "replace");
            }}
            title="Add new card"
            width={512}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    formProps?.onFinish?.({
                        ...values,
                        stageId: searchParams.get("stageId")
                            ? Number(searchParams.get("stageId"))
                            : null,
                        userIds: [],
                    });
                }}
            >
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
