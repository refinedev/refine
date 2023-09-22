import { lazy, Suspense } from "react";

import { useForm } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";

import { Button, Form, Space } from "antd";

import { Task } from "@/interfaces";

const MDEditor = lazy(() => import("@uiw/react-md-editor"));

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
                <Suspense>
                    <Form.Item noStyle name="description">
                        <MDEditor
                            preview="edit"
                            data-color-mode="light"
                            height={250}
                        />
                    </Form.Item>
                </Suspense>
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
