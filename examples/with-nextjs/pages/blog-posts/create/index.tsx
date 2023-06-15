import { useForm, useSelect, Create } from "@refinedev/antd";
import { Form, Select, Input } from "antd";
import { GetServerSideProps } from "next";

import { authProvider } from "src/authProvider";
import { IPost } from "src/interfaces";

const PostCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<IPost>({
        resource: "categories",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
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
        </Create>
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

    return {
        props: {},
    };
};

export default PostCreate;
