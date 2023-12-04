import { IResourceComponentsProps } from "@refinedev/core";
import { useForm, useSelect, Edit } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

import { IInvoice, IMission } from "../../interfaces";

export const EditInvoice: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IInvoice>({
        meta: { populate: ["company", "contact", "missions"] },
    });

    const { selectProps: companySelectProps } = useSelect({
        resource: "companies",
        optionLabel: "name",
        pagination: {
            mode: "server",
        },
    });

    const { selectProps: contactSelectProps } = useSelect({
        resource: "contacts",
        optionLabel: "first_name",
        pagination: {
            mode: "server",
        },
    });

    const { selectProps: missionSelectProps } = useSelect({
        resource: "missions",
        optionLabel: "mission",
        pagination: {
            mode: "server",
        },
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                initialValues={{
                    ...formProps.initialValues,
                    missions: formProps.initialValues?.missions?.map(
                        (m: IMission) => ({
                            label: m.mission,
                            value: m.id,
                        }),
                    ),
                }}
                layout="vertical"
                wrapperCol={{ md: 18, lg: 16 }}
            >
                <Form.Item label="Invoice Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Company"
                    name={["company", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...companySelectProps} />
                </Form.Item>

                <Form.Item
                    label="Mission"
                    name={["missions"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...missionSelectProps} mode="multiple" />
                </Form.Item>
                <Form.Item label="Discount(%)" name="discount">
                    <Input />
                </Form.Item>
                <Form.Item label="Tax(%)" name="tax">
                    <Input />
                </Form.Item>
                <Form.Item label="Custom ID" name="custom_id">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Contact"
                    name={["contact", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...contactSelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
