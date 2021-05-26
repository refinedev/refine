import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    useList,
} from "@pankod/refine";

import { IPost, ILanguage } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps>  = (props) => {
    const { tableProps } = useTable<IPost>();

    const { data, isLoading } = useList<ILanguage>("languages");
    return (
        <List {...props}>
            <Table {...tableProps} key="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    key="language"
                    dataIndex="language"
                    title="Language"
                    render={(value: string) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id == value)
                                        ?.title
                                }
                            />
                        );
                    }}
                />
                <Table.Column<IPost>
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
