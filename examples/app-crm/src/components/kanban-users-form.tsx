import { useForm, useSelect } from "@refinedev/antd";
import { Button, Form, Select, Space } from "antd";

type Props = {
    initialValues: {
        userIds?: { label: string; value: string }[];
    };
    cancelForm: () => void;
};

export const KanbanUsersForm = ({ initialValues, cancelForm }: Props) => {
    const { formProps, saveButtonProps } = useForm({
        queryOptions: {
            enabled: false,
        },
        redirect: false,
    });

    const { selectProps } = useSelect({
        resource: "users",
        meta: {
            fields: ["name", "id"],
        },
        optionLabel: "name",
    });

    return (
        <div
            style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
                gap: "12px",
            }}
        >
            <Form {...formProps} initialValues={initialValues}>
                <Form.Item noStyle name="userIds">
                    <Select
                        {...selectProps}
                        mode="multiple"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
            </Form>
            <Space>
                <Button type="default" onClick={cancelForm}>
                    Cancel
                </Button>
                <Button {...saveButtonProps} type="primary">
                    Save
                </Button>
            </Space>
        </div>
    );
};
