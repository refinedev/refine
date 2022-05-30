import { IResourceComponentsProps } from "@pankod/refine-core";

import { Checkbox, Create, Form, Input, useForm } from "@pankod/refine-antd";

import { ICategory } from "interfaces";

export const CategoryCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<ICategory>();

    return (
        <Create saveButtonProps={saveButtonProps}>
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
                <Form.Item label="Active" name="active" valuePropName="checked">
                    <Checkbox>Active</Checkbox>
                </Form.Item>
            </Form>
        </Create>
    );
};
