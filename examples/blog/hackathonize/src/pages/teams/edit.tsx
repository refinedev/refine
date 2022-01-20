import { Edit, Form, Input, useForm } from "@pankod/refine-antd";

import { TeamType } from "interfaces";

export const TeamsEdit: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<TeamType>();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
