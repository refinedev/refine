import { IResourceComponentsProps } from "@pankod/refine-core";
import { Edit, useForm } from "@pankod/refine-antd";

import { Form, Input } from "antd";

import { ICategory } from "interfaces";

export const CategoriesEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<ICategory>();

    return (
        <Edit saveButtonProps={saveButtonProps}>
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
