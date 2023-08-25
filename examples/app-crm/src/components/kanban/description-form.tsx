import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import { Button, Form, Space } from "antd";
import MDEditor from "@uiw/react-md-editor";

import { Task } from "../../interfaces/graphql";

type Props = {
    initialValues: {
        description?: Task["description"];
    };
    cancelForm: () => void;
};

export const DescriptionForm = ({ initialValues, cancelForm }: Props) => {
    const { formProps, saveButtonProps } = useForm<Task, HttpError, Task>({
        queryOptions: {
            enabled: false,
        },
        redirect: false,
        onMutationSuccess: () => {
            cancelForm();
        },
    });

    return (
        <>
            <Form {...formProps} initialValues={initialValues}>
                <Form.Item noStyle name="description">
                    <MDEditor
                        preview="edit"
                        data-color-mode="light"
                        height={250}
                    />
                </Form.Item>
            </Form>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    marginTop: "12px",
                }}
            >
                <Space>
                    <Button type="default" onClick={cancelForm}>
                        Cancel
                    </Button>
                    <Button {...saveButtonProps} type="primary">
                        Save
                    </Button>
                </Space>
            </div>
        </>
    );
};
