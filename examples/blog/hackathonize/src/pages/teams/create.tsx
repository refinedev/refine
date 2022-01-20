import { Create, Form, Input, useForm } from "@pankod/refine-antd";

import { TeamType } from "interfaces";

export const TeamsCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<TeamType>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};
