import { useForm } from "@refinedev/antd";
import { Button, Form, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { CheckListInput } from "./checklist-input";
import { Task } from "../interfaces/graphql";

type Props = {
    initialValues: {
        checklist?: Task["checklist"];
    };
};

export const KanbanCheckListForm = ({ initialValues }: Props) => {
    const { formProps } = useForm({
        queryOptions: {
            enabled: false,
        },
        redirect: false,
        autoSave: {
            enabled: true,
        },
    });

    return (
        <Form {...formProps} initialValues={initialValues}>
            <Form.List name="checklist">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field) => (
                            <Space key={field.key} style={{ width: "100%" }}>
                                <Form.Item
                                    {...field}
                                    style={{ marginBottom: 0 }}
                                    name={[field.name]}
                                >
                                    <CheckListInput />
                                </Form.Item>
                                <DeleteOutlined
                                    onClick={() => remove(field.name)}
                                />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add checklist item
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    );
};
