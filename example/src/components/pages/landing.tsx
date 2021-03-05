import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
    useFileUploadState,
    useTranslate,
    RichtextField,
} from "readmin";

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
                <Form.Item
                    label={translate("common:resources.posts.fields.content")}
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ReactQuill theme="snow" />
                </Form.Item>
            </Form>
        </Create>
    );
};

export const LandingEdit = (props: any) => {
    const translate = useTranslate();
    const { isLoading } = useFileUploadState();

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
                    <ReactQuill theme="snow" />
                </Form.Item>
            </Form>
        </Edit>
    );
};

export const LandingShow = (props: any) => {
    return (
        <Show {...props}>
            <ShowSimple title="Landing Title">
                <TextField renderRecordKey="id" />
                <TextField renderRecordKey="title" />
                <RichtextField renderRecordKey="content" />
            </ShowSimple>
        </Show>
    );
};
