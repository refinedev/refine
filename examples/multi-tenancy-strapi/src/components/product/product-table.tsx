import { useTenant } from "@/providers/tenant";
import type { Category, Product } from "@/types";
import {
  EditButton,
  FilterDropdown,
  NumberField,
  getDefaultSortOrder,
  useSelect,
  type useTableReturnType,
} from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Avatar, Input, Select, Table, Typography } from "antd";
import { createStyles } from "antd-style";
import { EyeIcon } from "lucide-react";
import { PaginationTotal } from "../pagination";
import { StatusTag } from "../status-tag";

type ProductWithCategories = Product & {
  category: Category;
};

type ProductTableProps = {
  useTableResult: useTableReturnType<ProductWithCategories>;
};

export const ProductTable = ({ useTableResult }: ProductTableProps) => {
  const { filters, sorters } = useTableResult;

  const { tenant } = useTenant();

  const { styles } = useStyles();
  const go = useGo();

  const { selectProps: selectPropsCategories } = useSelect({
    resource: "categories",
    filters: [
      {
        field: "store.id",
        operator: "eq",
        value: tenant.id,
      },
    ],
    optionLabel: "title",
    optionValue: "id",
    pagination: {
      mode: "off",
    },
  });

  return (
    <div className={styles.container}>
      <Table
        {...useTableResult.tableProps}
        size="middle"
        pagination={{
          ...useTableResult.tableProps.pagination,
          size: "default",
          showTotal: (total) => <PaginationTotal total={total} />,
          pageSizeOptions: [3, 10],
          showSizeChanger: false,
        }}
        rowKey="id"
      >
        <Table.Column
          dataIndex="id"
          title="ID #"
          width={80}
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
          defaultFilteredValue={getDefaultFilter("id", filters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search ID" />
            </FilterDropdown>
          )}
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              #{value}
            </Typography.Text>
          )}
        />
        <Table.Column<ProductWithCategories>
          dataIndex="image"
          title="Image"
          width={72}
          render={(_, record) => (
            <Avatar
              src={record.image?.formats?.thumbnail?.url}
              shape="square"
              size="large"
            />
          )}
        />
        <Table.Column
          width={180}
          dataIndex="title"
          title="Title"
          defaultFilteredValue={getDefaultFilter("title", filters, "contains")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search title" />
            </FilterDropdown>
          )}
          render={(value) => (
            <Typography.Paragraph
              ellipsis={{ rows: 1 }}
              style={{ margin: 0, maxWidth: "180px" }}
            >
              {value}
            </Typography.Paragraph>
          )}
        />
        <Table.Column
          width={220}
          dataIndex="description"
          title="Description"
          render={(value) => (
            <Typography.Paragraph
              ellipsis={{ rows: 1 }}
              style={{ margin: 0, maxWidth: "220px" }}
            >
              {value}
            </Typography.Paragraph>
          )}
        />
        <Table.Column
          dataIndex="price"
          title="Price"
          align="end"
          width={96}
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
          render={(value) => (
            <NumberField
              value={value}
              style={{
                whiteSpace: "nowrap",
              }}
              options={{ style: "currency", currency: "USD" }}
            />
          )}
        />
        <Table.Column<ProductWithCategories>
          dataIndex="category.id"
          title="Category"
          width={120}
          defaultFilteredValue={getDefaultFilter(
            "category.id",
            filters,
          )?.toString()}
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              mapValue={(value: any) => {
                if (Number.isNaN(Number.parseInt(value, 10))) {
                  return null;
                }
                return Number(value);
              }}
            >
              <Select
                {...selectPropsCategories}
                placeholder="Select category"
              />
            </FilterDropdown>
          )}
          render={(_, record) => (
            <Typography.Paragraph
              ellipsis={{ rows: 1 }}
              style={{ margin: 0, maxWidth: "120px" }}
            >
              {record?.category.title}
            </Typography.Paragraph>
          )}
        />
        <Table.Column<ProductWithCategories>
          dataIndex="status"
          title="Status"
          width={112}
          sorter
          defaultSortOrder={getDefaultSortOrder("status", sorters)}
          render={(value) => <StatusTag status={value === "AVAILABLE"} />}
        />
        <Table.Column
          dataIndex="id"
          title="Actions"
          width={80}
          align="center"
          render={(value) => (
            <EditButton
              className={styles.showButton}
              hideText
              recordItemId={value}
              icon={<EyeIcon size={16} />}
              onClick={() => {
                go({
                  to: {
                    resource: "products",
                    action: "edit",
                    id: value,
                  },
                  options: { keepQuery: true },
                });
              }}
            />
          )}
        />
      </Table>
    </div>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      marginTop: "32px",
    },
    showButton: {
      borderRadius: "100%",

      "& .ant-btn-icon": {
        width: "16px",
        height: "16px",
      },
    },
  };
});
