import { ComponentMeta } from "@storybook/react";
import { List, Table, useTable } from "@pankod/refine-antd";

export default {
    title: "Example/Table",
    component: List,
    argTypes: {},
} as ComponentMeta<typeof List>;

export const Primary = () => {
    // Sets the hooks for both the label and primary props
    const { tableProps } = useTable();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column title="Id" dataIndex="id" />
                <Table.Column title="Title" dataIndex="title" />
            </Table>
        </List>
    );
};
