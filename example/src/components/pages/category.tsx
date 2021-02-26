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
    useTranslate,
} from "readmin";

export const CategoryList = (props: { resourceName: string }) => {
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
                    key="id"
                    dataIndex="id"
                    title={translate("common:resources.categories.fields.id")}
                />
                <Column
                    key="title"
                    dataIndex="title"
                    title={translate(
                        "common:resources.categories.fields.title",
                    )}
                />
            </Table>
        </List>
    );
};

export const CategoryCreate = (props: any) => {
    const translate = useTranslate();
    return (
        <Create {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <FormItem
                    label={translate("common:resources.categories.forms.title")}
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

export const CategoryEdit = (props: any) => {
    const translate = useTranslate();
    return (
        <Edit {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <FormItem
                    label={translate("common:resources.categories.forms.title")}
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
