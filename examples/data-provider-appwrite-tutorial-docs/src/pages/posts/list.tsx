import {
  List,
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

import type { IPost } from "../../interfaces";

export const PostList = () => {
  const { tableProps, sorters } = useTable<IPost>({
    initialSorter: [
      {
        field: "$id",
        order: "asc",
      },
    ],
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          width={100}
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column dataIndex="title" title="Title" sorter />

        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          fixed="right"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
