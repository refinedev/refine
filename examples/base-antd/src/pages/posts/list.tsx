import {
  useMany,
  getDefaultFilter,
  parseTableParamsFromQuery,
  useParsed,
} from "@refinedev/core";

import {
  List,
  TextField,
  EditButton,
  ShowButton,
  FilterDropdown,
  TagField,
  useTable,
  useSelect,
} from "@refinedev/antd";

import { Table, Space, Select, Radio } from "antd";

import type { IPost, ICategory } from "../../interfaces";

export const PostList = () => {
  const { params } = useParsed();

  const {
    tableProps,
    filters,
    createLinkForSyncWithLocation,
    sorters,
    page,
    pageSize,
    current,
    setPage,
    setCurrent,
  } = useTable<IPost>({
    syncWithLocation: true,
  });

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data, isLoading } = useMany<ICategory>({
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
  });

  const syncWithLocationLink = createLinkForSyncWithLocation({
    filters,
    sorters,
    pagination: {
      page,
      current,
      pageSize,
    },
  });
  const parsedTableParams = parseTableParamsFromQuery(params);

  const { current: paramsCurrent, page: paramsPage } = params || {};

  console.log({
    params,
    parsedTableParams,
    syncWithLocationLink,
  });

  return (
    <List>
      <button
        onClick={() =>
          setPage((prev) => {
            return Number(prev) + 1;
          })
        }
      >
        increment setPage
      </button>
      <button
        onClick={() =>
          setCurrent((prev) => {
            return Number(prev) + 1;
          })
        }
      >
        increment setCurrent
      </button>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={data?.data.find((item) => item.id === value)?.title}
              />
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
                placeholder="Select Category"
                {...categorySelectProps}
              />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("category.id", filters, "in")}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: string) => <TagField value={value} />}
          defaultFilteredValue={getDefaultFilter("status", filters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Radio.Group>
                <Radio value="published">Published</Radio>
                <Radio value="draft">Draft</Radio>
                <Radio value="rejected">Rejected</Radio>
              </Radio.Group>
            </FilterDropdown>
          )}
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
