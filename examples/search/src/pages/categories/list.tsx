import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    Space,
    ShowButton,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<ICategory>();

    return (
        <List {...props}>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        <Space>
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
