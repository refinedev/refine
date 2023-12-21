import React, { Suspense } from "react";
import { useForm } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";

import { Button, Form, Space } from "antd";

import { Task } from "@/graphql/schema.types";
import { UPDATE_TASK_MUTATION } from "../project-modal-edit/queries";
import {
    UpdateTaskMutation,
    UpdateTaskMutationVariables,
} from "@/graphql/types";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";

const MDEditor = React.lazy(() => import("@uiw/react-md-editor"));

type Props = {
    initialValues: {
        description?: Task["description"];
    };
    cancelForm: () => void;
};

export const DescriptionForm = ({ initialValues, cancelForm }: Props) => {
    const { formProps, saveButtonProps } = useForm<
        GetFields<UpdateTaskMutation>,
        HttpError,
        Pick<GetVariables<UpdateTaskMutationVariables>, "description">
    >({
        queryOptions: {
            enabled: false,
        },
        redirect: false,
        onMutationSuccess: () => {
            cancelForm();
        },
        meta: {
            gqlMutation: UPDATE_TASK_MUTATION,
        },
    });

    return (
        <>
            <Form {...formProps} initialValues={initialValues}>
                <Form.Item noStyle name="description">
                    <Suspense>
                        <MDEditor
                            preview="edit"
                            data-color-mode="light"
                            height={250}
                        />
                    </Suspense>
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
