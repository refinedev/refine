import { IResourceComponentsProps } from "@refinedev/core";

import { Edit, ListButton, RefreshButton, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

import { ICategory } from "interfaces";

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<ICategory>({
        metaData: {
            fields: ["id", "title"],
        },
    });

    return (
        <Edit
            headerProps={{
                extra: (
                    <>
                        <ListButton />
                        <RefreshButton onClick={() => queryResult?.refetch()} />
                    </>
                ),
            }}
            saveButtonProps={saveButtonProps}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
