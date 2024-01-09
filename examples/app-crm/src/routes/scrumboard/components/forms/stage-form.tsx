import { useEffect } from "react";

import { useForm, useSelect } from "@refinedev/antd";
import { HttpError, useInvalidate } from "@refinedev/core";
import { GetFields, GetFieldsFromList } from "@refinedev/nestjs-query";

import { FlagOutlined } from "@ant-design/icons";
import { Checkbox, Form, Select, Space } from "antd";

import { Task } from "@/graphql/schema.types";
import { KanbanGetTaskQuery, TaskStagesSelectQuery } from "@/graphql/types";

import { AccordionHeaderSkeleton } from "../accordion-header-skeleton";
import { TASK_STAGES_SELECT_QUERY } from "./queries";

type KanbanTask = GetFields<KanbanGetTaskQuery>;

type Props = {
    initialValues: {
        completed: KanbanTask["completed"];
        stage: KanbanTask["stage"];
    };
    isLoading?: boolean;
};

export const StageForm = ({ initialValues, isLoading }: Props) => {
    const invalidate = useInvalidate();
    const { formProps } = useForm<Task, HttpError, Task>({
        queryOptions: {
            enabled: true,
        },
        autoSave: {
            enabled: true,
            debounce: 0,
            onFinish: (values) => {
                return {
                    ...values,
                    stage: undefined,
                    stageId: values.stage?.id,
                };
            },
        },
        onMutationSuccess: () => {
            invalidate({ invalidates: ["list"], resource: "tasks" });
        },
    });

    const { selectProps } = useSelect<GetFieldsFromList<TaskStagesSelectQuery>>(
        {
            resource: "taskStages",
            meta: {
                gqlQuery: TASK_STAGES_SELECT_QUERY,
            },
        },
    );

    useEffect(() => {
        formProps.form?.setFieldsValue(initialValues);
    }, [initialValues.completed, initialValues.stage]);

    if (isLoading) {
        return <AccordionHeaderSkeleton />;
    }

    return (
        <div
            style={{ padding: "12px 24px", borderBottom: "1px solid #d9d9d9" }}
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
                <Space size={5}>
                    <FlagOutlined />
                    <Form.Item noStyle name={["stage", "id"]}>
                        <Select
                            {...selectProps}
                            popupMatchSelectWidth={false}
                            options={selectProps.options?.concat([
                                {
                                    label: "Unassigned",
                                    value: null,
                                },
                            ])}
                            bordered={false}
                            showSearch={false}
                            placeholder="Select a stage"
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
