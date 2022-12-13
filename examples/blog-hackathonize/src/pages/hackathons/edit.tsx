import { Edit, Form, Input, useForm, DatePicker } from "@pankod/refine-antd";
import dayjs from "dayjs";

import { HackathonType } from "interfaces";

export const HackathonsEdit: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<HackathonType>();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Starts"
                    name="start"
                    getValueProps={(value) => ({ value: dayjs(value) })}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Ends"
                    name="end"
                    getValueProps={(value) => ({ value: dayjs(value) })}
                >
                    <DatePicker />
                </Form.Item>
            </Form>
        </Edit>
    );
};
