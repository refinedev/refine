import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    BooleanField,
} from "@pankod/refine";

import { ICategory } from "interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<ICategory>({});

    return (
        <List {...props}>
            <Table {...tableProps} rowKey="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column
                    key="active"
                    dataIndex="active"
                    title="Active"
                    render={(value) => {
                        return <BooleanField value={value} />;
                    }}
                />
                <Table.Column<ICategory>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        <Space>
                            <EditButton size="small" recordItemId={record.id} />
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
