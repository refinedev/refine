import { useForm } from "@refinedev/antd";
import { Button, Form } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { CheckListInput } from "./checklist-input";
import { ChecklistHeader } from "./checklist-header";
import { AccordionHeaderSkeleton } from "./accordion-header-skeleton";
import { Task } from "../../interfaces/graphql";

type Props = {
    initialValues: {
        checklist?: Task["checklist"];
    };
    isLoading?: boolean;
};

export const CheckListForm = ({ initialValues, isLoading }: Props) => {
    const { formProps } = useForm({
        queryOptions: {
            enabled: false,
        },
        redirect: false,
        autoSave: {
            enabled: true,
        },
        successNotification: false,
    });

    if (isLoading) {
        return <AccordionHeaderSkeleton />;
    }

    return (
        <div>
            <ChecklistHeader checklist={initialValues.checklist} />
            <div
                style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "8px",
                    marginLeft: "30px",
                }}
            >
                <Form {...formProps} initialValues={initialValues}>
                    <Form.List name="checklist">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <div
                                        key={field.key}
                                        style={{
                                            display: "flex",
                                            flex: 1,
                                            alignItems: "center",
                                            padding: "8px",
                                            borderBottom: "1px solid #d9d9d9",
                                        }}
                                    >
                                        <Form.Item
                                            {...field}
                                            noStyle
                                            name={[field.name]}
                                        >
                                            <CheckListInput />
                                        </Form.Item>
                                        <Button
                                            type="text"
                                            size="small"
                                            onClick={() => remove(field.name)}
                                            style={{ opacity: "0.15" }}
                                            icon={<DeleteOutlined />}
                                        />
                                    </div>
                                ))}
                                <Form.Item noStyle>
                                    <Button
                                        type="link"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                        style={{
                                            textAlign: "left",
                                            marginTop: "8px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Add item
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>
        </div>
    );
};
