import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Edit,
    Form,
    Input,
    Select,
    Button,
    SaveButton,
    useSelect,
    useStepsForm,
    Steps,
} from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";

const { Step } = Steps;

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        current,
        gotoStep,
        stepsProps,
        formProps,
        saveButtonProps,
        queryResult,
    } = useStepsForm<IPost>();

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    const [selectedTab, setSelectedTab] =
        React.useState<"write" | "preview">("write");

    const formList = [
        <>
            <Form.Item
                label="Title"
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
                label="Category"
                name={["category", "id"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select {...categorySelectProps} />
            </Form.Item>
            <Form.Item
                label="Status"
                name="status"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    options={[
                        {
                            label: "Published",
                            value: "published",
                        },
                        {
                            label: "Draft",
                            value: "draft",
                        },
                        {
                            label: "Rejected",
                            value: "rejected",
                        },
                    ]}
                />
            </Form.Item>
        </>,
        <>
            <Form.Item
                label="Content"
                name="content"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
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
        </>,
    ];

    return (
        <Edit
            actionButtons={
                <>
                    {current > 0 && (
                        <Button
                            onClick={() => {
                                gotoStep(current - 1);
                            }}
                        >
                            Previous
                        </Button>
                    )}
                    {current < formList.length - 1 && (
                        <Button
                            onClick={() => {
                                gotoStep(current + 1);
                            }}
                        >
                            Next
                        </Button>
                    )}
                    {current === formList.length - 1 && (
                        <SaveButton {...saveButtonProps} />
                    )}
                </>
            }
        >
            <Steps {...stepsProps}>
                <Step title="About Post" />
                <Step title="Content" />
            </Steps>

            <Form {...formProps} layout="vertical" style={{ marginTop: 30 }}>
                {formList[current]}
            </Form>
        </Edit>
    );
};
