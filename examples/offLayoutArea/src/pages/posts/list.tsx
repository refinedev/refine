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
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable<IPost>({
        initialPageSize: 50,
    });

    return (
        <List {...props}>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};
