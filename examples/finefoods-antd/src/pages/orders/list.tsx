import { useMemo } from "react";
import {
    useTranslate,
    IResourceComponentsProps,
    CrudFilters,
    useExport,
    useNavigation,
    HttpError,
    getDefaultFilter,
} from "@refinedev/core";

import {
    List,
    useTable,
    getDefaultSortOrder,
    DateField,
    NumberField,
    useSelect,
    ExportButton,
    FilterDropdown,
} from "@refinedev/antd";
import { SearchOutlined } from "@ant-design/icons";
import {
    Table,
    Popover,
    Input,
    Select,
    Typography,
    Flex,
    Avatar,
    theme,
    Badge,
    InputNumber,
} from "antd";

import { OrderStatus, OrderActions } from "../../components";
import { IOrder, IOrderFilterVariables, IOrderStatus } from "../../interfaces";
import { getUniqueListWithCount } from "../../utils";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
    const { token } = theme.useToken();

    const { tableProps, sorters, filters } = useTable<
        IOrder,
        HttpError,
        IOrderFilterVariables
    >({
        filters: {
            initial: [
                {
                    field: "user.fullName",
                    operator: "contains",
                    value: "",
                },
                {
                    field: "store.title",
                    operator: "contains",
                    value: "",
                },
            ],
        },
    });

    const t = useTranslate();
    const { show } = useNavigation();

    const { isLoading, triggerExport } = useExport<IOrder>({
        sorters,
        filters,
        pageSize: 50,
        maxItemCount: 50,
        mapData: (item) => {
            return {
                id: item.id,
                amount: item.amount,
                orderNumber: item.orderNumber,
                status: item.status.text,
                store: item.store.title,
                user: item.user.firstName,
            };
        },
    });

    const { selectProps: orderSelectProps } = useSelect<IOrderStatus>({
        resource: "orderStatuses",
        optionLabel: "text",
        optionValue: "text",
        defaultValue: getDefaultFilter("status.text", filters, "in"),
    });

    return (
        <List
            headerProps={{
                extra: (
                    <ExportButton onClick={triggerExport} loading={isLoading} />
                ),
            }}
        >
            <Table
                {...tableProps}
                rowKey="id"
                onRow={(record) => {
                    return {
                        onClick: () => {
                            show("orders", record.id);
                        },
                    };
                }}
            >
                <Table.Column
                    key="orderNumber"
                    dataIndex="orderNumber"
                    title={t("orders.fields.order")}
                    render={(value) => (
                        <Typography.Text>#{value}</Typography.Text>
                    )}
                    filterIcon={(filtered) => (
                        <SearchOutlined
                            style={{
                                color: filtered
                                    ? token.colorPrimary
                                    : undefined,
                            }}
                        />
                    )}
                    defaultFilteredValue={getDefaultFilter(
                        "orderNumber",
                        filters,
                        "eq",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <InputNumber
                                addonBefore="#"
                                style={{ width: "100%" }}
                                placeholder={t(
                                    "orders.filter.orderNumber.placeholder",
                                )}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IOrder>
                    key="status.text"
                    dataIndex="status"
                    title={t("orders.fields.status")}
                    render={(status) => {
                        return <OrderStatus status={status.text} />;
                    }}
                    sorter
                    defaultSortOrder={getDefaultSortOrder(
                        "status.text",
                        sorters,
                    )}
                    defaultFilteredValue={getDefaultFilter(
                        "status.text",
                        filters,
                        "in",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                {...orderSelectProps}
                                style={{ width: "200px" }}
                                allowClear
                                mode="multiple"
                                placeholder={t(
                                    "orders.filter.status.placeholder",
                                )}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IOrder>
                    key="products"
                    dataIndex="products"
                    title={t("orders.fields.products")}
                    render={(_, record) => {
                        const uniqueProducts = getUniqueListWithCount({
                            list: record.products,
                            field: "id",
                        });
                        const firstThree = uniqueProducts.slice(0, 3);
                        const rest = uniqueProducts.slice(3);

                        return (
                            <Flex gap={12}>
                                {firstThree.map((product) => {
                                    return (
                                        <Popover
                                            key={product.id}
                                            content={
                                                <Typography.Text>
                                                    {product.name}
                                                </Typography.Text>
                                            }
                                        >
                                            <Badge
                                                style={{
                                                    color: "#fff",
                                                }}
                                                count={
                                                    product.count === 1
                                                        ? 0
                                                        : product.count
                                                }
                                            >
                                                <Avatar
                                                    shape="square"
                                                    src={product.images[0].url}
                                                />
                                            </Badge>
                                        </Popover>
                                    );
                                })}
                                {!!rest.length && (
                                    <Popover
                                        title={t("orders.fields.products")}
                                        content={
                                            <Flex gap={8}>
                                                {rest.map((product) => {
                                                    return (
                                                        <Popover
                                                            key={product.id}
                                                            content={
                                                                <Typography.Text>
                                                                    {
                                                                        product.name
                                                                    }
                                                                </Typography.Text>
                                                            }
                                                        >
                                                            <Badge
                                                                style={{
                                                                    color: "#fff",
                                                                }}
                                                                count={
                                                                    product.count ===
                                                                    1
                                                                        ? 0
                                                                        : product.count
                                                                }
                                                            >
                                                                <Avatar
                                                                    shape="square"
                                                                    src={
                                                                        product
                                                                            .images[0]
                                                                            .url
                                                                    }
                                                                />
                                                            </Badge>
                                                        </Popover>
                                                    );
                                                })}
                                            </Flex>
                                        }
                                    >
                                        <Avatar
                                            shape="square"
                                            style={{
                                                backgroundColor:
                                                    token.colorPrimaryBg,
                                            }}
                                        >
                                            <Typography.Text
                                                style={{
                                                    color: token.colorPrimary,
                                                }}
                                            >
                                                +{rest.length}
                                            </Typography.Text>
                                        </Avatar>
                                    </Popover>
                                )}
                            </Flex>
                        );
                    }}
                />
                <Table.Column
                    align="right"
                    key="amount"
                    dataIndex="amount"
                    title={t("orders.fields.amount")}
                    defaultSortOrder={getDefaultSortOrder("amount", sorters)}
                    sorter
                    render={(value) => {
                        return (
                            <NumberField
                                options={{
                                    currency: "USD",
                                    style: "currency",
                                }}
                                value={value / 100}
                            />
                        );
                    }}
                />
                <Table.Column
                    key="store.title"
                    dataIndex={["store", "title"]}
                    title={t("orders.fields.store")}
                    filterIcon={(filtered) => (
                        <SearchOutlined
                            style={{
                                color: filtered
                                    ? token.colorPrimary
                                    : undefined,
                            }}
                        />
                    )}
                    defaultFilteredValue={getDefaultFilter(
                        "store.title",
                        filters,
                        "contains",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                placeholder={t(
                                    "orders.filter.store.placeholder",
                                )}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    key="user.fullName"
                    dataIndex={["user", "fullName"]}
                    title={t("orders.fields.customer")}
                    filterIcon={(filtered) => (
                        <SearchOutlined
                            style={{
                                color: filtered
                                    ? token.colorPrimary
                                    : undefined,
                            }}
                        />
                    )}
                    defaultFilteredValue={getDefaultFilter(
                        "user.fullName",
                        filters,
                        "contains",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                placeholder={t(
                                    "orders.filter.customer.placeholder",
                                )}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    key="createdAt"
                    dataIndex="createdAt"
                    title={t("orders.fields.createdAt")}
                    render={(value) => <DateField value={value} format="LLL" />}
                    sorter
                />
                <Table.Column<IOrder>
                    fixed="right"
                    title={t("table.actions")}
                    dataIndex="actions"
                    key="actions"
                    align="center"
                    render={(_value, record) => (
                        <OrderActions record={record} />
                    )}
                />
            </Table>
        </List>
    );
};
