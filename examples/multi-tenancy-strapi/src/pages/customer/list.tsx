import { CustomerStatus } from "@/components/customer";
import { useTenant } from "@/providers/tenant";
import { PaginationTotal } from "@/components/pagination";
import {
  FilterDropdown,
  List,
  ShowButton,
  getDefaultSortOrder,
  useTable,
} from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Input, Table, Typography } from "antd";
import { createStyles } from "antd-style";
import { EyeIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import type { Order, Product } from "@/types";

type CustomerExtended = Order & {
  products: Product[];
};

export const CustomerList = ({ children }: PropsWithChildren) => {
  const { tenant } = useTenant();

  const go = useGo();

  const { styles } = useStyles();

  const { tableProps, filters, sorters } = useTable<CustomerExtended>({
    filters: {
      initial: [
        {
          field: "address",
          operator: "contains",
          value: "",
        },
        { field: "phone", operator: "contains", value: "" },
        { field: "name", operator: "contains", value: "" },
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
      populate: ["orders.products.image"],
    },
  });

  return (
    <>
      <List
        title={
          <Typography.Title level={3} className={styles.title}>
            Customers
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
            dataIndex="name"
            title="Name"
            defaultFilteredValue={getDefaultFilter("name", filters, "contains")}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search name" />
              </FilterDropdown>
            )}
          />
          <Table.Column
            dataIndex="address"
            title="Address"
            defaultFilteredValue={getDefaultFilter(
              "address",
              filters,
              "contains",
            )}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search address" />
              </FilterDropdown>
            )}
          />
          <Table.Column
            dataIndex="phone"
            title="GSM No"
            defaultFilteredValue={getDefaultFilter("id", filters, "contains")}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search phone" />
              </FilterDropdown>
            )}
          />
          <Table.Column
            dataIndex="status"
            title="Status"
            sorter
            defaultSortOrder={getDefaultSortOrder("status", sorters)}
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
