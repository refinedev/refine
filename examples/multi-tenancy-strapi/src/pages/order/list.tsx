import { useGo } from "@refinedev/core";
import { List, useTable, NumberField, ShowButton } from "@refinedev/antd";
import { Table, Typography, Flex, Tooltip, Avatar, Badge } from "antd";
import type { Customer, Order, Product } from "../../types";
import { createStyles } from "antd-style";
import { OrderStatus } from "@/components/order";
import { EyeIcon } from "lucide-react";
import { getUniqueProductsWithQuantity } from "@/utils/get-unique-products";
import { useTenant } from "@/providers/tenant";
import type { PropsWithChildren } from "react";

type OrderExtended = Order & {
  products: Product[];
  customer: Customer;
};

export const OrderList = ({ children }: PropsWithChildren) => {
  const { tenant } = useTenant();

  const go = useGo();

  const { styles } = useStyles();

  const { tableProps } = useTable<OrderExtended>({
    permanentFilter: [
      {
        field: "store][id]",
        operator: "eq",
        value: tenant.id,
      },
    ],
    meta: {
      populate: ["products.image", "customer"],
    },
  });

  return (
    <>
      <List
        headerProps={{
          className: styles.header,
        }}
        title={
          <Typography.Title level={3} className={styles.title}>
            Orders
          </Typography.Title>
        }
        headerButtons={false}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title="Order#"
            render={(value) => <Typography.Text>#{value}</Typography.Text>}
          />
          <Table.Column
            dataIndex="status"
            title="Status"
            render={(value) => {
              return <OrderStatus value={value} />;
            }}
          />
          <Table.Column<OrderExtended>
            dataIndex="products"
            title="Products"
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
          <Table.Column dataIndex={["customer", "name"]} title="Customer" />
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
    header: {
      "& .ant-page-header-heading": {
        height: "56px",
        alignItems: "center",
      },
    },
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
