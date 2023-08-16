import { HttpError } from "@refinedev/core";
import { useForm, useSelect } from "@refinedev/antd";
import { Checkbox, Form, Select, Space } from "antd";
import { FlagOutlined } from "@ant-design/icons";

import { Task } from "../interfaces/graphql";

//TODO: Add FormValues type to useForm
type FormValues = {
    completed: boolean;
    stage: {
        id: number;
    };
};

type Props = {
    initialValues: {
        completed: Task["completed"];
        stage: Task["stage"];
    };
};

export const KanbanStageForm = ({ initialValues }: Props) => {
    const { formProps } = useForm<Task, HttpError>({
        //TODO: will be removed
        meta: {
            fields: ["title", "id", { stage: ["id", "title"] }, "completed"],
        },
        queryOptions: {
            enabled: false,
        },
        autoSave: {
            enabled: true,
            debounce: 0,
            onFinish: (values: any) => {
                return {
                    ...values,
                    stage: undefined,
                    stageId: values.stage.id,
                };
            },
        },
    });

    const { selectProps } = useSelect({
        resource: "taskStages",
        meta: {
            fields: ["title", "id"],
        },
    });

    return (
        <div
            style={{
                padding: "11px 24px",
                borderBottom: "1px solid #d9d9d9",
            }}
        >
            <Form
                layout="inline"
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                {...formProps}
                initialValues={initialValues}
            >
                <Space>
                    <FlagOutlined />
                    <Form.Item noStyle name={["stage", "id"]}>
                        <Select
                            {...selectProps}
                            bordered={false}
                            showSearch={false}
                            onSearch={undefined}
                            size="small"
                        />
                    </Form.Item>
                </Space>
                <Form.Item noStyle name="completed" valuePropName="checked">
                    <Checkbox>Mark as complete</Checkbox>
                </Form.Item>
            </Form>
        </div>
    );
};
