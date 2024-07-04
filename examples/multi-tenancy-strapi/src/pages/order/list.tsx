import { OrderStatus } from "@/components/order";
import { useTenant } from "@/providers/tenant";
import { PaginationTotal } from "@/components/pagination";
import { getUniqueProductsWithQuantity } from "@/utils/get-unique-products";
import {
  FilterDropdown,
  List,
  NumberField,
  ShowButton,
  getDefaultSortOrder,
  useTable,
} from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import {
  Avatar,
  Badge,
  Flex,
  Input,
  Select,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { createStyles } from "antd-style";
import { EyeIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import type { Customer, Order, Product } from "@/types";

type OrderExtended = Order & {
  products: Product[];
  customer: Customer;
};

export const OrderList = ({ children }: PropsWithChildren) => {
  const { tenant } = useTenant();

  const go = useGo();

  const { styles } = useStyles();

  const { tableProps, filters, sorters } = useTable<OrderExtended>({
    filters: {
      initial: [
        {
          field: "status",
          operator: "contains",
          value: [],
        },
        { field: "products.title", operator: "contains", value: "" },
        { field: "customer.name", operator: "contains", value: "" },
      ],
      permanent: [
        {
          field: "store.id",
          operator: "eq",
          value: tenant.id,
        },
      ],
    },
    meta: {
      populate: ["products.image", "customer"],
    },
  });

  return (
    <>
      <List
        title={
          <Typography.Title level={3} className={styles.title}>
            Orders
          </Typography.Title>
        }
        headerButtons={false}
      >
        <Table
          {...tableProps}
          rowKey="id"
          size="middle"
          pagination={{
            ...tableProps.pagination,
            size: "default",
            showTotal: (total) => <PaginationTotal total={total} />,
            pageSizeOptions: [3, 10],
            showSizeChanger: false,
          }}
        >
          <Table.Column
            dataIndex="id"
            title="Order #"
            width={96}
            sorter
            defaultSortOrder={getDefaultSortOrder("id", sorters)}
            defaultFilteredValue={getDefaultFilter("id", filters)}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search ID" />
              </FilterDropdown>
            )}
            render={(value) => <Typography.Text>#{value}</Typography.Text>}
          />
          <Table.Column
            dataIndex="status"
            title="Status"
            defaultFilteredValue={getDefaultFilter(
              "status",
              filters,
              "contains",
            )}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select mode="multiple" placeholder="Select Status">
                  <Select.Option value="CANCELLED">Canceled</Select.Option>
                  <Select.Option value="IN_DELIVERY">In Delivery</Select.Option>
                  <Select.Option value="DELIVERED">Delivered</Select.Option>
                  <Select.Option value="READY">Ready</Select.Option>
                </Select>
              </FilterDropdown>
            )}
            render={(value) => {
              return <OrderStatus value={value} />;
            }}
          />
          <Table.Column<OrderExtended>
            dataIndex={["products", "title"]}
            title="Products"
            defaultFilteredValue={getDefaultFilter(
              "products.title",
              filters,
              "contains",
            )}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search products" />
              </FilterDropdown>
            )}
            render={(_, record) => {
              const products = record.products || [];
              const uniqueProducts = getUniqueProductsWithQuantity(products);
              const firstThreeProducts = uniqueProducts.slice(0, 3);
              const remainingProducts = uniqueProducts.length - 3;

              return (
                <Flex gap={8}>
                  {firstThreeProducts.map((product) => {
                    return (
                      <Tooltip title={product.title} key={product.id}>
                        <Badge
                          count={product.quantity === 1 ? 0 : product.quantity}
                        >
                          <Avatar
                            src={product.image.formats?.thumbnail?.url}
                            shape="square"
                            size="large"
                          />
                        </Badge>
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
          <Table.Column<OrderExtended>
            dataIndex="amount"
            title="Amount"
            render={(_, record) => {
              const products = record.products || [];
              const amount = products.reduce(
                (acc, product) => acc + product.price,
                0,
              );

              return (
                <NumberField
                  value={amount}
                  options={{ style: "currency", currency: "USD" }}
                />
              );
            }}
          />
          <Table.Column
            dataIndex={["customer", "name"]}
            title="Customer"
            defaultFilteredValue={getDefaultFilter(
              "customer.name",
              filters,
              "contains",
            )}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search customer" />
              </FilterDropdown>
            )}
          />
          <Table.Column
            dataIndex="id"
            title="Actions"
            width={80}
            align="center"
            render={(value) => (
              <ShowButton
                className={styles.showButton}
                hideText
                recordItemId={value}
                icon={<EyeIcon size={16} />}
                onClick={() => {
                  go({
                    to: {
                      resource: "orders",
                      action: "show",
                      id: value,
                    },
                    options: { keepQuery: true },
                  });
                }}
              />
            )}
          />
        </Table>
      </List>
      {children}
    </>
  );
};

const useStyles = createStyles(() => {
  return {
    title: {
      margin: "0 !important",
      textTransform: "capitalize",
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
