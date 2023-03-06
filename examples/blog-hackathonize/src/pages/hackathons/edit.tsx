import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
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
