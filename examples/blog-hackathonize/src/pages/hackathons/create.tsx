import { Create, useForm } from "@refinedev/antd";

import { Form, Input, DatePicker } from "antd";

import { HackathonType } from "interfaces";

export const HackathonsCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<HackathonType>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Name" name="start">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Name" name="end">
                    <DatePicker />
                </Form.Item>
            </Form>
        </Create>
    );
};
