import { ComponentMeta } from "@storybook/react";
import { List, useTable } from "@refinedev/antd";

import { Table } from "antd";

import { RefineWithLayout } from "../../../.storybook/preview";

export default {
    title: "Table",
    component: List,
    argTypes: {},
    decorators: [(Story) => RefineWithLayout(Story)],
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
