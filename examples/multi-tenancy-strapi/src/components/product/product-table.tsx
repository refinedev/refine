import {
  EditButton,
  NumberField,
  type useTableReturnType,
} from "@refinedev/antd";
import { createStyles } from "antd-style";
import { Typography, Table, Avatar } from "antd";
import { EyeIcon } from "lucide-react";
import { PaginationTotal } from "../pagination";
import { StatusTag } from "../status-tag";
import { useGo } from "@refinedev/core";
import type { Category, Product } from "@/types";

type ProductWithCategories = Product & {
  category: Category;
};

type ProductTableProps = {
  useTableResult: useTableReturnType<ProductWithCategories>;
};

export const ProductTable = ({ useTableResult }: ProductTableProps) => {
  const { styles } = useStyles();
  const go = useGo();

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
        <Table.Column width={200} dataIndex="title" title="Title" />
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
          dataIndex="category"
          title="Category"
          width={120}
          render={(value) => (
            <Typography.Paragraph
              ellipsis={{ rows: 1 }}
              style={{ margin: 0, maxWidth: "120px" }}
            >
              {value?.title}
            </Typography.Paragraph>
          )}
        />
        <Table.Column<ProductWithCategories>
          dataIndex="status"
          title="Status"
          width={112}
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
