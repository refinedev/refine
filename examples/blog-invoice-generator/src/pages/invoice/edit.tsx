import { IResourceComponentsProps } from "@refinedev/core";

import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Grid, Select } from "antd";

import { IInvoice } from "interfaces";

export const InvoiceEdit: React.FC<IResourceComponentsProps> = () => {
    const breakpoint = Grid.useBreakpoint();
    const formWidth = breakpoint.lg ? "60%" : "100%";
    const { formProps, saveButtonProps, queryResult } = useForm<IInvoice>({
        metaData: { populate: ["company", "contact", "missions"] },
    });

    const currentInvoice = queryResult?.data?.data;
    const defaultMissions = currentInvoice?.missions?.map(
        (mission) => mission?.id,
    );

    const { selectProps: companySelectProps } = useSelect({
        resource: "companies",
        defaultValue: currentInvoice?.company?.id,
        optionLabel: "name",
    });

    const { selectProps: contactSelectProps } = useSelect({
        resource: "contacts",
        defaultValue: currentInvoice?.contact?.id,
        optionLabel: "first_name",
    });

    const { selectProps: missionSelectProps } = useSelect({
        resource: "missions",
        defaultValue: defaultMissions,
        optionLabel: "mission",
        optionValue: "id",
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
                    label="Invoice Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
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
                    name={["mission", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        {...missionSelectProps}
                        mode="multiple"
                        defaultValue={defaultMissions as any}
                    />
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
