import { useForm, useSelect, Create, Layout } from "@refinedev/antd";
import { LoaderArgs, redirect } from "@remix-run/node";
import { Form, Select, Input } from "antd";
import { authProvider } from "~/authProvider";

import { IPost } from "../interfaces";

const PostCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<IPost>({
        resource: "categories",
    });

    return (
        <Layout>
            <Create saveButtonProps={saveButtonProps}>
                <Form {...formProps} layout="vertical">
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
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
                    <Form.Item label="Category" name={["category", "id"]}>
                        <Select {...categorySelectProps} />
                    </Form.Item>
                </Form>
            </Create>
        </Layout>
    );
};

export default PostCreate;

export async function loader({ request }: LoaderArgs) {
    const { authenticated, redirectTo } = await authProvider.check(request);

    if (!authenticated) {
        throw redirect(redirectTo ?? "/login");
    }

    return {};
}
