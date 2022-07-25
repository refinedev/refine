import React, { useState } from "react";
import {
    IResourceComponentsProps,
    useMany,
    useDeleteMany,
} from "@pankod/refine-core";

import {
    List,
    Table,
    TextField,
    Form,
    EditButton,
    Input,
    Select,
    Space,
    Button,
    MarkdownField,
    SaveButton,
    useEditableTable,
    useSelect,
} from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
        [],
    );

    const {
        tableProps,
        formProps,
        isEditing,
        saveButtonProps,
        cancelButtonProps,
        editButtonProps,
    } = useEditableTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: categoryIds,
    });

    const {
        mutate,
        isSuccess,
        isLoading: deleteManyIsLoading,
    } = useDeleteMany<IPost>();

    const deleteSelectedItems = () => {
        mutate({
            resource: "posts",
            ids: selectedRowKeys.map(String),
        });
    };

    React.useEffect(() => {
        if (isSuccess) {
            setSelectedRowKeys([]);
        }
    }, [isSuccess]);

    const onSelectChange = (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const hasSelected = selectedRowKeys.length > 0;

    const expandedRowRender = (record: IPost) => {
        if (isEditing(record.id)) {
            return (
                <Form.Item
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
            );
        }
        return <MarkdownField value={record.content} />;
    };

    return (
        <List
            pageHeaderProps={{
                subTitle: hasSelected && (
                    <Button
                        danger
                        onClick={deleteSelectedItems}
                        disabled={!hasSelected}
                        loading={deleteManyIsLoading}
                    >
                        {`Delete selected ${selectedRowKeys.length} items`}
                    </Button>
                ),
            }}
        >
            <Form {...formProps}>
                <Table<IPost>
                    expandable={{
                        expandedRowRender,
                    }}
                    rowSelection={rowSelection}
                    {...tableProps}
                    rowKey="id"
                    scroll={{ x: 400 }}
                >
                    <Table.Column dataIndex="id" title="ID" align="center" />
                    <Table.Column<IPost>
                        dataIndex="title"
                        title="Title"
                        render={(value, record) => {
                            if (isEditing(record.id)) {
                                return (
                                    <Form.Item
                                        name="title"
                                        style={{ margin: 0 }}
                                    >
                                        <Input />
                                    </Form.Item>
                                );
                            }
                            return <TextField value={value} />;
                        }}
                    />
                    <Table.Column<IPost>
                        dataIndex={["category", "id"]}
                        title="Category"
                        render={(value, record) => {
                            if (isEditing(record.id)) {
                                return (
                                    <Form.Item
                                        name={["category", "id"]}
                                        style={{ margin: 0 }}
                                    >
                                        <Select {...categorySelectProps} />
                                    </Form.Item>
                                );
                            }

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
                        width={200}
                        render={(_, record) => {
                            if (isEditing(record.id)) {
                                return (
                                    <Space>
                                        <SaveButton
                                            {...saveButtonProps}
                                            size="small"
                                        />
                                        <Button
                                            {...cancelButtonProps}
                                            size="small"
                                        >
                                            Cancel
                                        </Button>
                                    </Space>
                                );
                            }
                            return (
                                <EditButton
                                    {...editButtonProps(record.id)}
                                    hideText
                                    size="small"
                                />
                            );
                        }}
                    />
                </Table>
            </Form>
        </List>
    );
};
