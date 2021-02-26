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
    useTranslate,
} from "readmin";

export const TagList = (props: any) => {
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
                    title={translate("common:resources.tags.fields.id")}
                />
                <Column
                    key="title"
                    dataIndex="title"
                    title={translate("common:resources.tags.fields.title")}
                />
                <Column
                    key="id"
                    dataIndex="id"
                    title={translate("common:resources.tags.fields.image")}
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
    const translate = useTranslate();
    return (
        <Create {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <FormItem
                    label={translate("common:resources.tags.fields.image")}
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
    const translate = useTranslate();
    return (
        <Edit {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <FormItem
                    label={translate("common:resources.tags.fields.title")}
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
