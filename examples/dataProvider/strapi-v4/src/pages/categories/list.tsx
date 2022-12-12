import { useState } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    Space,
    EditButton,
    DateField,
    DeleteButton,
    Form,
    Radio,
} from "@pankod/refine-antd";

import { ICategory } from "interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const [locale, setLocale] = useState("en");

    const { tableProps } = useTable<ICategory>({
        metaData: {
            locale,
        },
    });

    return (
        <List>
            <Form layout="inline" initialValues={{ locale }}>
                <Form.Item label="Locale" name="locale">
                    <Radio.Group onChange={(e) => setLocale(e.target.value)}>
                        <Radio.Button value="en">English</Radio.Button>
                        <Radio.Button value="de">Deutsch</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
            <br />
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex="createdAt"
                    title="Created At"
                    render={(value) => <DateField value={value} format="LLL" />}
                    sorter
                />
                <Table.Column<ICategory>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                size="small"
                                hideText
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                size="small"
                                hideText
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
