import * as React from "react";
import {
    List,
    Table,
    Create,
    Edit,
    Form,
    FormItem,
    TextInput,
    TextField,
    ReferenceField,
    ImageField,
} from "readmin";

export const TagList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <TextField source="id" title="ID" />
                <TextField source="title" title="Title" />
                <ReferenceField value="id" resource="images" title="Image" > 
                    <ImageField source="url" imageTitle="meow" width={200} />
                </ReferenceField>
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
