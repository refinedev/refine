import * as React from "react";
import {
    List,
    Table,
    Create,
    Edit,
    Form,
    FormItem,
    TextInput,
    Column,
    ImageField,
    ReferenceField,
} from "readmin";

export const TagList = (props: any) => {
    return (
        <List {...props}>
            <Table rowKey="id">
                <Column key="id" dataIndex="id" title="ID" />
                <Column key="title" dataIndex="title" title="Title" />
                <Column
                    key="id"
                    dataIndex="id"
                    title="Image"
                    render={(value) => (
                        <ReferenceField resource="images" value={value}>
                            <ImageField
                                renderRecordKey="url"
                                imageTitle="meow"
                                width={200}
                            />
                        </ReferenceField>
                    )}
                />
            </Table>
        </List>
    );
};

export const TagCreate = (props: any) => {
    return (
        <Create {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <FormItem
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextInput />
                </FormItem>
            </Form>
        </Create>
    );
};

export const TagEdit = (props: any) => {
    return (
        <Edit {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <FormItem
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextInput />
                </FormItem>
            </Form>
        </Edit>
    );
};
