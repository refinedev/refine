import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    useMany,
    BooleanField,
} from "@pankod/refine";

import { ICategory } from "interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<ICategory>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
    });

    return (
        <List {...props}>
            <Table {...tableProps} key="id">
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
