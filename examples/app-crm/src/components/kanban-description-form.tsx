import { Button, Form, Space } from "antd";
import MDEditor from "@uiw/react-md-editor";
import { useForm } from "@refinedev/antd";

import { Task } from "../interfaces/graphql";

type Props = {
    initialValues: {
        description?: Task["description"];
    };
    cancelForm: () => void;
};

export const KanbanDescriptionForm = ({ initialValues, cancelForm }: Props) => {
    const { formProps, saveButtonProps } = useForm({
        queryOptions: {
            enabled: false,
        },
        redirect: false,
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
