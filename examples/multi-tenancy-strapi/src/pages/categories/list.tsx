import { StatusTag } from "@/components/status-tag";
import { useTenant } from "@/providers/tenant";
import type { Category, Product } from "@/types";
import {
  CreateButton,
  List,
  SaveButton,
  TextField,
  useEditableTable,
} from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  Segmented,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { createStyles } from "antd-style";
import { Eye, EyeOff, PenLine, PlusCircle } from "lucide-react";
import type { PropsWithChildren } from "react";

type CategoryWithProducts = Category & {
  products: Product[];
};

export const CategoriesList = (props: PropsWithChildren) => {
  const { tenant } = useTenant();

  const { styles } = useStyles();

  const go = useGo();

  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
  } = useEditableTable<CategoryWithProducts>({
    sorters: { permanent: [{ field: "createdAt", order: "asc" }] },
    pagination: {
      mode: "off",
    },
    filters: {
      permanent: [
        {
          field: "store.id",
          operator: "eq",
          value: tenant.id,
        },
      ],
    },
    meta: {
      populate: ["products.image"],
    },
  });

  return (
    <>
      <List
        title={
          <Typography.Title level={3} className={styles.title}>
            Categories
          </Typography.Title>
        }
        headerButtons={[
          <CreateButton
            className={styles.createButton}
            icon={<PlusCircle />}
            onClick={() => {
              go({
                to: {
                  resource: "categories",
                  action: "create",
                },
                options: { keepQuery: true },
              });
            }}
          >
            Add new category
          </CreateButton>,
        ]}
      >
        <Form {...formProps}>
          <Table
            {...tableProps}
            rowKey="id"
            onRow={(record) => ({
              // eslint-disable-next-line
              onClick: (event: any) => {
                if (event.target.nodeName === "TD") {
                  setEditId?.(record.id);
                }
              },
            })}
          >
            <Table.Column<CategoryWithProducts>
              dataIndex="title"
              title="Title"
              width={360}
              render={(value, record) => {
                if (isEditing(record.id)) {
                  return (
                    <Form.Item name="title" style={{ margin: 0 }}>
                      <Input />
                    </Form.Item>
                  );
                }
                return <TextField value={value} />;
              }}
            />
            <Table.Column<CategoryWithProducts>
              dataIndex="products"
              title="Products"
              render={(_, record) => {
                const products = record.products || [];
                const firstThreeProducts = products.slice(0, 3);
                const remainingProducts = products.length - 3;

                return (
                  <Flex gap={8}>
                    {firstThreeProducts.map((product) => {
                      return (
                        <Tooltip title={product.title} key={product.id}>
                          <Avatar
                            src={product.image.formats?.thumbnail?.url}
                            shape="square"
                            size="large"
                          />
                        </Tooltip>
                      );
                    })}
                    {remainingProducts > 0 && (
                      <Avatar
                        shape="square"
                        size="large"
                        style={{
                          fontVariant: "tabular-nums",
                          backgroundColor: "#F0F0F0",
                          color: "#000000D9",
                        }}
                      >{`+${remainingProducts}`}</Avatar>
                    )}
                  </Flex>
                );
              }}
            />
            <Table.Column<CategoryWithProducts>
              dataIndex="status"
              title="Status"
              width={186}
              render={(value, record) => {
                if (isEditing(record.id)) {
                  return (
                    <Form.Item name="status" style={{ margin: 0 }}>
                      <Segmented
                        className={styles.status}
                        options={[
                          {
                            value: "VISIBLE",
                            label: "Visible",
                          },
                          {
                            value: "INVISIBLE",
                            label: "Invisible",
                          },
                        ]}
                      />
                    </Form.Item>
                  );
                }
                return (
                  <StatusTag
                    status={value === "VISIBLE"}
                    texts={{
                      true: "Visible",
                      false: "Invisible",
                    }}
                    icons={{
                      true: (
                        <Eye
                          style={{
                            width: "14px",
                            height: "14px",
                          }}
                        />
                      ),
                      false: (
                        <EyeOff
                          style={{
                            width: "14px",
                            height: "14px",
                          }}
                        />
                      ),
                    }}
                  />
                );
              }}
            />
            <Table.Column<CategoryWithProducts>
              title="Actions"
              dataIndex="actions"
              width={192}
              align="right"
              fixed="right"
              render={(_, record) => {
                if (isEditing(record.id)) {
                  return (
                    <Space>
                      <SaveButton
                        {...saveButtonProps}
                        icon={null}
                        size="small"
                        type="primary"
                      />
                      <Button {...cancelButtonProps} size="small">
                        Cancel
                      </Button>
                    </Space>
                  );
                }
                return (
                  <Button
                    type="default"
                    size="small"
                    style={{
                      fontSize: "12px",
                    }}
                    icon={
                      <PenLine
                        style={{
                          width: "12px",
                          height: "12px",
                        }}
                      />
                    }
                    {...editButtonProps(record.id)}
                  >
                    Edit
                  </Button>
                );
              }}
            />
          </Table>
        </Form>
      </List>
      {props.children}
    </>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    status: {
      borderRadius: "80px",
      width: "100%",
      padding: "4px",

      "& .ant-segmented-item": {
        flex: 1,
        borderRadius: "44px",
      },

      "& .ant-segmented-thumb": {
        borderRadius: "44px",
      },
    },
    title: {
      margin: "0 !important",
      textTransform: "capitalize",
    },
    createButton: {
      height: "48px",
      borderRadius: "80px",
      fontSize: "16px",
    },
  };
});
