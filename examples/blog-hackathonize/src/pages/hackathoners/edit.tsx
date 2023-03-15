import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import { HackathonerType, TeamType } from "interfaces";

export const HackathonersEdit: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<HackathonerType>();

    const { selectProps: teamsSelectProps } = useSelect<TeamType>({
        resource: "teams",
        optionLabel: "name",
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Team" name="team_id">
                    <Select {...teamsSelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
