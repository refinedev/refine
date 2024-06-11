import { CustomerStatus } from "@/components/customer";
import { Drawer } from "@/components/drawer";
import { OrderStatus } from "@/components/order/status";
import type { Customer, Order, Product } from "@/types";
import { getUniqueProductsWithQuantity } from "@/utils/get-unique-products";
import { DateField, NumberField } from "@refinedev/antd";
import { useGo, useShow } from "@refinedev/core";
import {
  Avatar,
  Badge,
  Flex,
  Skeleton,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { createStyles } from "antd-style";
import { Calendar, MapPin, Phone, Tag } from "lucide-react";

type CustomerExtended = Customer & {
  orders: (Order &
    {
      products: Product[];
    }[])[];
};

export const CustomerShow = () => {
  const go = useGo();

  const { styles } = useStyles();

  const { queryResult } = useShow<CustomerExtended>({
    meta: {
      populate: ["orders.products.image"],
    },
  });

  const onClose = () => {
    go({
      to: {
        resource: "customers",
        action: "list",
      },
      options: { keepQuery: true },
    });
  };

  const isLoading = queryResult.isLoading;
  const customer = queryResult.data?.data;

  return (
    <Drawer
      open={true}
      closable={false}
      onClose={onClose}
      styles={{
        wrapper: {
          maxWidth: "640px",
        },
      }}
    >
      <div className={styles.container}>
        <Typography.Title level={5} className={styles.title}>
          {customer?.name || " "}
        </Typography.Title>
        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <div className={styles.infoLabelContainer}>
              <Tag className={styles.infoIcon} />
              <Typography.Text className={styles.infoLabel}>
                Status
              </Typography.Text>
            </div>
            {isLoading ? (
              <Skeleton.Input
                style={{ height: "30px", borderRadius: "40px" }}
                active
              />
            ) : (
              <CustomerStatus value={customer?.status} />
            )}
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabelContainer}>
              <MapPin className={styles.infoIcon} />
              <Typography.Text className={styles.infoLabel}>
                Address
              </Typography.Text>
            </div>
            {isLoading ? (
              <Skeleton.Input style={{ height: "22px" }} active />
            ) : (
              <Typography.Text className={styles.infoValue}>
                {customer?.address}
              </Typography.Text>
            )}
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabelContainer}>
              <Phone className={styles.infoIcon} />
              <Typography.Text className={styles.infoLabel}>
                Phone
              </Typography.Text>
            </div>
            {isLoading ? (
              <Skeleton.Input style={{ height: "22px" }} active />
            ) : (
              <Typography.Text className={styles.infoValue}>
                {customer?.phone}
              </Typography.Text>
            )}
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabelContainer}>
              <Calendar className={styles.infoIcon} />
              <Typography.Text className={styles.infoLabel}>
                Joined at
              </Typography.Text>
            </div>
            {isLoading ? (
              <Skeleton.Input style={{ height: "22px" }} active />
            ) : (
              <DateField value={customer?.createdAt} format="MMM DD, YYYY" />
            )}
          </div>
        </div>

        <Typography.Title level={5} className={styles.title}>
          Order History
        </Typography.Title>
        <div className={styles.tableContainer}>
          <Table
            loading={isLoading}
            dataSource={customer?.orders || []}
            rowKey="id"
            pagination={false}
            scroll={{ x: true }}
            onRow={(record) => {
              return {
                onClick: () => {
                  go({
                    to: {
                      resource: "orders",
                      action: "show",
                      id: record.id,
                    },
                  });
                },
              };
            }}
          >
            <Table.Column
              title="Order #"
              dataIndex="id"
              render={(value) => <Typography.Text>#{value}</Typography.Text>}
            />
            <Table.Column
              title="Products"
              dataIndex="products"
              render={(products) => {
                const uniqueProducts = getUniqueProductsWithQuantity(
                  products || [],
                );
                const firstThreeProducts = uniqueProducts.slice(0, 3);
                const remainingProducts = uniqueProducts.length - 3;

                return (
                  <Flex gap={8}>
                    {firstThreeProducts.map((product) => {
                      return (
                        <Tooltip title={product.title} key={product.id}>
                          <Badge
                            count={
                              product.quantity === 1 ? 0 : product.quantity
                            }
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
            <Table.Column
              title="Status"
              dataIndex="status"
              render={(value) => <OrderStatus value={value} />}
            />
            <Table.Column<CustomerExtended["orders"][number][number]>
              title="Amount"
              dataIndex="amount"
              render={(_, record) => {
                const products = record.products || [];
                const uniqueProducts = getUniqueProductsWithQuantity(products);
                const totalAmount = uniqueProducts.reduce((acc, product) => {
                  return acc + product.price * product.quantity;
                }, 0);

                return (
                  <NumberField
                    value={totalAmount}
                    options={{ style: "currency", currency: "USD" }}
                  />
                );
              }}
            />
          </Table>
        </div>
      </div>
    </Drawer>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      padding: "0px 16px",
    },
    title: {
      margin: "24px 32px !important",
      minHeight: "24px",
    },
    infoContainer: {
      backgroundColor: "white",
      border: `1px solid ${token.colorBorder}`,
      borderRadius: "12px",
    },
    infoRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "16px",

      ":not(:last-child)": {
        borderBottom: `1px solid ${token.colorBorder}`,
      },
    },
    infoLabelContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "128px",
    },
    infoLabel: {},
    infoIcon: {
      width: "24px",
      height: "24px",
      color: token.colorPrimary,
    },
    infoValue: {},
    tableContainer: {
      border: `1px solid ${token.colorBorder}`,
      borderRadius: "12px",
      overflow: "hidden",

      ".ant-table-content": {
        border: "none",
      },
      ".ant-table-wrapper .ant-table": {
        borderRadius: "0px",
      },
      ".ant-table-cell": {
        borderRadius: "0px",
      },
    },
    tableFooterTotalText: {
      textAlign: "right",
      width: "120px",
      fontWeight: 600,
    },
  };
});
