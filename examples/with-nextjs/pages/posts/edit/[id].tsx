import { useForm, useSelect, Edit } from "@refinedev/antd";
import { GetOneResponse } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { Form, Input, Select } from "antd";
import { GetServerSideProps } from "next";

import { authProvider } from "src/authProvider";
import { API_URL } from "src/constants";
import { IPost } from "src/interfaces";

const PostEdit: React.FC<{ initialData: GetOneResponse<IPost> }> = ({
    initialData,
}) => {
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
        queryOptions: {
            initialData,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<IPost>({
        resource: "categories",
        defaultValue: queryResult?.data?.data?.category.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    name="title"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    name="status"
                >
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Category"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    name={["category", "id"]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const { authenticated, redirectTo } = await authProvider.check(context);

    if (!authenticated) {
        return {
            props: {},
            redirect: {
                destination: redirectTo,
                permanent: false,
            },
        };
    }

    const data = await dataProvider(API_URL).getOne({
        resource: "posts",
        id: context.params?.id as string,
    });

    return {
        props: {
            initialData: data,
        },
    };
};

export default PostEdit;
