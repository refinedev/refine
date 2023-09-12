import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";
import { useModalForm } from "@refinedev/antd";
import { Form, Input, Modal } from "antd";

export const KanbanCreatePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const { formProps, modalProps, close } = useModalForm({
        action: "create",
        defaultVisible: true,
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
