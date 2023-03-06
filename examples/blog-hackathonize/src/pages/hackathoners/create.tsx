import { Create, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import { HackathonerType, TeamType } from "interfaces";

export const HackathonersCreate: React.FC = () => {
    const { formProps, saveButtonProps, queryResult } =
        useForm<HackathonerType>();

    const { selectProps: teamsSelectProps } = useSelect<TeamType>({
        resource: "teams",
        defaultValue: queryResult?.data?.data?.team_id,
        optionLabel: "name",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Team" name="team_id">
                    <Select {...teamsSelectProps} />
                </Form.Item>
            </Form>
        </Create>
    );
};
