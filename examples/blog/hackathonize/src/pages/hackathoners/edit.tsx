import {
    Edit,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import { HackathonerType, TeamType } from "interfaces";

export const HackathonersEdit: React.FC = () => {
    const { formProps, saveButtonProps, queryResult } =
        useForm<HackathonerType>();

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
