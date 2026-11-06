import { useMany, getDefaultFilter } from "@refinedev/core";

import {
  List,
  EditButton,
  ShowButton,
  FilterDropdown,
  useTable,
  useSelect,
} from "@refinedev/antd";

import { Table, Space, Select, Radio, Typography } from "antd";

import type { IPost, ICategory } from "../../interfaces";
import { StatusBadge } from "../../components/StatusBadge";

const { Text } = Typography;

export const PostList = () => {
  const { tableProps, filters } = useTable<IPost>({
    syncWithLocation: true,
  });

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const {
    result: data,
    query: { isLoading },
  } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
    defaultValue: getDefaultFilter("category.id", filters, "in"),

    pagination: {
      mode: "server",
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id" size="middle">
        <Table.Column
          dataIndex="id"
          title="ID"
          width={70}
          render={(value) => (
            <Text
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                fontSize: 12,
                color: "#94a3b8",
              }}
            >
              #{value}
            </Text>
          )}
        />
        <Table.Column
          dataIndex="title"
          title="Title"
          render={(value) => (
            <Text strong style={{ color: "#0f172a", fontSize: 13 }}>
              {value}
            </Text>
          )}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          width={160}
          render={(value) => {
            if (isLoading) {
              return (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Loading...
                </Text>
              );
            }

            const title = data?.data.find((item) => item.id === value)?.title;

            return (
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: "2px 8px",
                  borderRadius: 6,
                  fontSize: 12,
                  color: "#475569",
                }}
              >
                {title || "—"}
              </span>
            );
          }}
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              mapValue={(selectedKeys) => selectedKeys.map(Number)}
            >
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Filter by category"
                {...categorySelectProps}
              />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("category.id", filters, "in")}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          width={130}
          render={(value: string) => <StatusBadge status={value} />}
          defaultFilteredValue={getDefaultFilter("status", filters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Radio.Group style={{ padding: 12 }}>
                <Space direction="vertical">
                  <Radio value="published">Published</Radio>
                  <Radio value="draft">Draft</Radio>
                  <Radio value="rejected">Rejected</Radio>
                </Space>
              </Radio.Group>
            </FilterDropdown>
          )}
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          width={100}
          render={(_, record) => (
            <Space size="small">
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
