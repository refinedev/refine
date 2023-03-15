import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import { HackathonerType, ProjectType, HackathonType } from "interfaces";

export const ProjectsEdit: React.FC = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<ProjectType>();

    const { selectProps: hackathonSelectProps } = useSelect<HackathonType>({
        resource: "hackathons",
        defaultValue: queryResult?.data?.data?.hackathon_id,
        optionLabel: "name",
    });

    const { selectProps: hackathonerSelectProps } = useSelect<HackathonerType>({
        resource: "hackathoners",
        defaultValue: queryResult?.data?.data?.hackathoner_id,
        optionLabel: "name",
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Url" name="url">
                    <Input />
                </Form.Item>
                <Form.Item label="Hackathon" name="hackathon_id">
                    <Select {...hackathonSelectProps} />
                </Form.Item>
                <Form.Item label="Hackathoner" name="hackathoner_id">
                    <Select {...hackathonerSelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
