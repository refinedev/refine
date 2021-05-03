import React from "react";
import {
    List,
    Create,
    Table,
    Form,
    Select,
    Input,
    TextField,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    useMany,
    useSelect,
    useModalForm,
    Modal,
} from "@pankod/refine";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "../../interfaces";

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    // Create modal section
    const {
        modalProps: createModalProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createModalShow,
    } = useModalForm<IPost>({
        action: "create",
    });

    const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
        "write",
    );

    return (
        <>
            <List
                {...props}
                createButtonProps={{
                    onClick: () => {
                        createModalShow();
                    },
                }}
            >
                <Table {...tableProps} key="id">
                    <Table.Column
                        key="id"
                        dataIndex="id"
                        title="ID"
                        render={(value) => <TextField value={value} />}
                    />
                    <Table.Column
                        key="title"
                        dataIndex="title"
                        title="Title"
                        render={(value) => <TextField value={value} />}
                    />
                    <Table.Column
                        dataIndex={["category", "id"]}
                        key="category.id"
                        title="Category"
                        render={(value) => {
                            if (isLoading) {
                                return <TextField value="Loading..." />;
                            }

                            return (
                                <TextField
                                    value={
                                        data?.data.find(
                                            (item) => item.id === value,
                                        )?.title
                                    }
                                />
                            );
                        }}
                    />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_value, record) => (
                            <Space>
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        )}
                    />
                </Table>
            </List>
            <Modal {...createModalProps} footer={null}>
                <Create {...props} saveButtonProps={createSaveButtonProps}>
                    <Form {...createFormProps} layout="vertical">
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
                            <Select
                                showSearch
                                filterOption={false}
                                {...categorySelectProps}
                            />
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
                                ]}
                            />
                        </Form.Item>
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
                                        <ReactMarkdown>
                                            {markdown}
                                        </ReactMarkdown>,
                                    )
                                }
                            />
                        </Form.Item>
                    </Form>
                </Create>
            </Modal>
        </>
    );
};
