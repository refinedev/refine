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
} from "readmin";

export const TagList = (props: any) => {
    return (
        <List {...props} component={ListWrapper}>
            <Table>
                <TextField source="id" title="ID" />
                <TextField source="title" title="Title" />
            </Table>
        </List>
    );
};

export const ListWrapper = (props: any) => {
    return (
        <div><span>Custom wrapper</span>
            {props.children}
        </div>

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
