import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Edit,
    Form,
    Select,
    Input,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import { IContact } from "interfaces";

export const EditContact: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IContact>({
        metaData: { populate: ["client"] },
    });

    const defaultClientCompany = queryResult?.data?.data;

    const { selectProps } = useSelect({
        resource: "clients",
        defaultValue: defaultClientCompany?.client?.id,
        optionValue: "id",
        optionLabel: "name",
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="First Name" name="first_name">
                    <Input />
                </Form.Item>
                <Form.Item label="Last Name" name="last_name">
                    <Input />
                </Form.Item>
                <Form.Item label="Client Company" name={["client", "id"]}>
                    <Select {...selectProps} />
                </Form.Item>
                <Form.Item label="Phone Number" name="phone_number">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="Job" name="job">
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
