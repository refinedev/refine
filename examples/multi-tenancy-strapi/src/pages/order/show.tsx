import { Drawer } from "@/components/drawer";
import { OrderStatus } from "@/components/order/status";
import type { Customer, Order, Product } from "@/types";
import {
  type UniqueProduct,
  getUniqueProductsWithQuantity,
} from "@/utils/get-unique-products";
import { DateField, NumberField } from "@refinedev/antd";
import { useGo, useShow } from "@refinedev/core";
import { Avatar, Flex, Skeleton, Table, Typography } from "antd";
import { createStyles } from "antd-style";
import { CalendarCheck, CalendarClock, MapPin, Tag, User } from "lucide-react";

export const OrderShow = () => {
  const go = useGo();

  const { styles } = useStyles();

  const { queryResult } = useShow<
    Order & {
      products: Product[];
      customer: Customer;
    }
  >({
    meta: {
      populate: ["products.image", "customer"],
    },
  });

  const onClose = () => {
    go({
      to: {
        resource: "orders",
        action: "list",
      },
      options: { keepQuery: true },
    });
  };

  const isLoading = queryResult.isLoading;
  const order = queryResult.data?.data;
  const uniqueProducts = getUniqueProductsWithQuantity(order?.products || []);
  const orderTotal =
    order?.products.reduce((acc, product) => acc + product.price, 0) || 0;

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
          Order #{order?.id}
        </Typography.Title>
        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <div className={styles.infoLabelContainer}>
              <User className={styles.infoIcon} />
              <Typography.Text className={styles.infoLabel}>
                Customer
              </Typography.Text>
            </div>
            {isLoading ? (
              <Skeleton.Input style={{ height: "22px" }} active />
            ) : (
              <Typography.Text className={styles.infoValue}>
                {order?.customer?.name}
              </Typography.Text>
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
                {order?.customer?.address}
              </Typography.Text>
            )}
          </div>
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
              <OrderStatus value={order?.status} />
            )}
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabelContainer}>
              <CalendarClock className={styles.infoIcon} />
              <Typography.Text className={styles.infoLabel}>
                Order Date
              </Typography.Text>
            </div>

            {isLoading ? (
              <Skeleton.Input style={{ height: "22px" }} active />
            ) : (
              <DateField
                value={order?.order_date}
                format="MMM DD, YYYY"
                className={styles.infoValue}
              />
            )}
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabelContainer}>
              <CalendarCheck className={styles.infoIcon} />
              <Typography.Text className={styles.infoLabel}>
                Delivery Date
              </Typography.Text>
            </div>
            {isLoading ? (
              <Skeleton.Input style={{ height: "22px" }} active />
            ) : (
              <DateField
                value={order?.delivery_date}
                format="MMM DD, YYYY"
                className={styles.infoValue}
              />
            )}
          </div>
        </div>

        <Typography.Title level={5} className={styles.title}>
          Products
        </Typography.Title>
        <div className={styles.tableContainer}>
          <Table
            loading={isLoading}
            dataSource={uniqueProducts}
            rowKey="id"
            pagination={false}
            scroll={{ x: true }}
            onRow={(record) => {
              return {
                onClick: () => {
                  go({
                    to: {
                      resource: "products",
                      action: "edit",
                      id: record.id,
                    },
                  });
                },
              };
            }}
            footer={() => {
              return (
                <Flex justify="flex-end">
                  <Typography.Text className={styles.tableFooterTotalText}>
                    Total
                  </Typography.Text>
                  <NumberField
                    className={styles.tableFooterTotalText}
                    style={{
                      textAlign: "right",
                      width: "120px",
                    }}
                    value={orderTotal}
                    options={{ style: "currency", currency: "USD" }}
                  />
                </Flex>
              );
            }}
          >
            <Table.Column<UniqueProduct>
              title="Product"
              dataIndex="title"
              render={(value, record) => (
                <Flex gap={16} align="center">
                  <Avatar
                    src={record.image?.url}
                    alt={value}
                    size="large"
                    shape="square"
                  />
                  <Typography.Text>{value}</Typography.Text>
                </Flex>
              )}
            />
            <Table.Column title="Quantity" dataIndex="quantity" />
            <Table.Column
              title="Price"
              dataIndex="price"
              align="right"
              width={120}
              render={(value) => (
                <NumberField
                  value={value}
                  options={{ style: "currency", currency: "USD" }}
                />
              )}
            />
            <Table.Column<UniqueProduct>
              title="Total "
              dataIndex="total"
              align="right"
              width={120}
              render={(_, record) => (
                <NumberField
                  value={record.quantity * record.price}
                  options={{ style: "currency", currency: "USD" }}
                />
              )}
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
