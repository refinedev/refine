import * as React from "react";
import {
    List,
    Table,
    Column,
    TextField,
    useTranslate,
    Create,
    Form,
    Input,
    Edit,
    Show,
    ShowSimple,
} from "readmin";

export const PostLightList = (props: any) => {
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
                <Column
                    dataIndex="slug"
                    title={translate("common:resources.posts.fields.slug")}
                    key="slug"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 2,
                    }}
                />
            </Table>
        </List>
    );
};

export const PostLightCreate = (props: any) => {
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

export const PostLightEdit = (props: any) => {
    const translate = useTranslate();

    return (
        <Edit {...props}>
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
        </Edit>
    );
};

export const PostLightShow = (props: any) => {
    return (
        <Show {...props}>
            <ShowSimple title="Post Title">
                <TextField renderRecordKey="title" />
            </ShowSimple>
        </Show>
    );
};
