import * as React from "react";
import {
    List,
    Table,
    Column,
    Create,
    Edit,
    Show,
    Form,
    TextField,
    Input,
    ShowSimple,
    Markdown,
    MarkdownField,
    normalizeFile,
    useApiUrl,
    useFileUploadState,
    useTranslate,
    useNotification,
    Richtext,
} from "readmin";

import { ShowAside } from "../show";

export const LandingList = (props: any) => {
    const translate = useTranslate();
    return (
        <List {...props}>
            <Table
                rowKey="id"
                pagination={{
                    pageSize: 20,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Column
                    dataIndex="id"
                    title={translate("common:resources.posts.fields.id")}
                    key="id"
                    sorter={{
                        multiple: 3,
                    }}
                    defaultSortOrder="descend"
                />
                <Column
                    dataIndex="title"
                    title={translate("common:resources.posts.fields.title")}
                    key="title"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
            </Table>
        </List>
    );
};

export const LandingCreate = (props: any) => {
    const translate = useTranslate();

    return (
        <Create {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label={translate("common:resources.posts.fields.title")}
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};

export const LandingEdit = (props: any) => {
    const apiUrl = useApiUrl();
    const translate = useTranslate();

    const { isLoading, onChange } = useFileUploadState();

    return (
        <Edit {...props} saveButtonProps={{ disabled: isLoading }}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label={translate("common:resources.posts.fields.title")}
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
                    label={translate("common:resources.posts.fields.content")}
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Richtext />
                </Form.Item>
            </Form>
        </Edit>
    );
};

export const LandingShow = (props: any) => {
    return (
        <Show {...props} aside={ShowAside}>
            <ShowSimple title="Landing Title">
                <TextField renderRecordKey="id" />
                <TextField renderRecordKey="title" />
                <MarkdownField renderRecordKey="content" />
            </ShowSimple>
        </Show>
    );
};
