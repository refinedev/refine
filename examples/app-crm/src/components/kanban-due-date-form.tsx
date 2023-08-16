import { SaveButton, useForm } from "@refinedev/antd";
import { Button, DatePicker, Form, Space } from "antd";
import dayjs from "dayjs";

import { Task } from "../interfaces/graphql";

type Props = {
    initialValues: {
        dueDate?: Task["dueDate"];
    };
    cancelForm: () => void;
};

export const KanbanDueDateForm = ({ initialValues, cancelForm }: Props) => {
    const { formProps, saveButtonProps } = useForm({
        queryOptions: {
            enabled: false,
        },
        redirect: false,
    });

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Form {...formProps} initialValues={initialValues}>
                <Form.Item
                    noStyle
                    name="dueDate"
                    getValueProps={(value) => ({ value: dayjs(value) })}
                >
                    <DatePicker
                        format="YYYY-MM-DD HH:mm"
                        showTime={{
                            showSecond: false,
                            format: "HH:mm",
                        }}
                        style={{ backgroundColor: "#fff" }}
                    />
                </Form.Item>
            </Form>
            <Space>
                <Button type="default" onClick={cancelForm}>
                    Cancel
                </Button>
                <SaveButton {...saveButtonProps} />
            </Space>
        </div>
    );
};
