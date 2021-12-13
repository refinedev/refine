import { useState } from "react";
import {
    Create,
    Form,
    Input,
    IResourceComponentsProps,
    useForm,
    Checkbox,
    useSelect,
    Select,
} from "@pankod/refine";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ICompany } from "interfaces";

export const JobCreate: React.FC<IResourceComponentsProps> = () => {
    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");
    const { formProps, saveButtonProps } = useForm<ICompany>();

    const { selectProps: companySelectProps } = useSelect<ICompany>({
        resource: "companies",
        optionLabel: "name",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Job Title"
                    name="title"
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
                <Form.Item label="Location" name="location">
                    <Input />
                </Form.Item>
                <Form.Item label="Content" name="content">
                    <ReactMde
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                            Promise.resolve(
                                <ReactMarkdown>{markdown}</ReactMarkdown>,
                            )
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Is Active"
                    name="isActive"
                    valuePropName="checked"
                >
                    <Checkbox>Active</Checkbox>
                </Form.Item>
            </Form>
        </Create>
    );
};
