import { useGo } from "@refinedev/core";
import { List, useTable, NumberField, ShowButton } from "@refinedev/antd";
import { Table, Typography, Flex, Tooltip, Avatar, Badge } from "antd";
import type { Order, Product } from "../../types";
import { createStyles } from "antd-style";
import { EyeIcon } from "lucide-react";
import { useTenant } from "@/providers/tenant";
import type { PropsWithChildren } from "react";
import { CustomerStatus } from "@/components/customer";

type CustomerExtended = Order & {
  products: Product[];
};

export const CustomerList = ({ children }: PropsWithChildren) => {
  const { tenant } = useTenant();

  const go = useGo();

  const { styles } = useStyles();

  const { tableProps } = useTable<CustomerExtended>({
    permanentFilter: [
      {
        field: "store][id]",
        operator: "eq",
        value: tenant.id,
      },
    ],
    meta: {
      populate: ["orders.products.image"],
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
          <Table.Column dataIndex="name" title="Name" />
          <Table.Column dataIndex="address" title="Address" />
          <Table.Column dataIndex="phone" title="GSM No" />
          <Table.Column
            dataIndex="status"
            title="Status"
            render={(value) => {
              return <CustomerStatus value={value} />;
            }}
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
                      resource: "customers",
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
