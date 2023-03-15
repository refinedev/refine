import { IResourceComponentsProps } from "@refinedev/core";

import { Create, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

import { ICreateSubscriber } from "interfaces";

export const CreateSubscriber: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<ICreateSubscriber>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};

export default CreateSubscriber;
