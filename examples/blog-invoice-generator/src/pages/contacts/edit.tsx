import { Edit, useForm, useSelect } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";

import { Form, Input, Grid, Select } from "antd";

import { IContact } from "interfaces";

export const ContactEdit: React.FC<IResourceComponentsProps> = () => {
    const breakpoint = Grid.useBreakpoint();
    const formWidth = breakpoint.lg ? "60%" : "100%";
    const { formProps, saveButtonProps, queryResult } = useForm<IContact>({
        metaData: { populate: ["client"] },
    });

    const defaultClientCompany = queryResult?.data?.data;

    const { selectProps } = useSelect({
        resource: "clients",
        // defaultValue: defaultClientCompany?.client?.id,
        optionValue: "id",
        optionLabel: "name",
    });

    return (
        <Edit
            saveButtonProps={saveButtonProps}
            headerProps={{
                style: {
                    width: formWidth,
                },
            }}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Client Company" name={["client", "id"]}>
                    <Select {...selectProps} />
                </Form.Item>
                <Form.Item label="Phone Number" name="phone_number">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Job" name="job">
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
