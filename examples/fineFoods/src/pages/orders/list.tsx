import {
    List,
    Table,
    TextField,
    useTable,
    useTranslate,
    IResourceComponentsProps,
    getDefaultSortOrder,
    DateField,
    Popover,
    Card,
    Input,
    Icons,
    Form,
    DatePicker,
    Select,
    NumberField,
    useSelect,
    Button,
    CrudFilters,
    Space,
    FormProps,
    Row,
    Col,
    ExportButton,
    ImportButton,
    useExport,
    useImport,
    Dropdown,
    Menu,
    useUpdate,
    useNavigation,
    getDefaultFilter,
} from "@pankod/refine";
import dayjs from "dayjs";

import { OrderStatus } from "components";

import { IOrder, IStore, IOrderFilterVariables } from "interfaces";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter, searchFormProps, filters } = useTable<
        IOrder,
        IOrderFilterVariables
    >({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { q, store, user, createdAt, status } = params;

            if (q) {
                filters.push({
                    field: "q",
                    operator: "eq",
                    value: q,
                });
            }

            if (store) {
                filters.push({
                    field: "store.id",
                    operator: "eq",
                    value: store,
                });
            }

            if (user) {
                filters.push({
                    field: "user.id",
                    operator: "eq",
                    value: user,
                });
            }

            if (status) {
                filters.push({
                    field: "status.text",
                    operator: "eq",
                    value: status,
                });
            }

            if (createdAt) {
                filters.push(
                    {
                        field: "createdAt",
                        operator: "gte",
                        value: createdAt[0].toISOString(),
                    },
                    {
                        field: "createdAt",
                        operator: "lte",
                        value: createdAt[1].toISOString(),
                    },
                );
            }

            return filters;
        },
    });

    const t = useTranslate();
    const { mutate } = useUpdate();
    const { show } = useNavigation();

    const importProps = useImport();
    const { loading, triggerExport } = useExport({
        sorter,
        filters,
        pageSize: 100,
        maxItemCount: 300,
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

    const Actions: React.FC = () => (
        <Space>
            <ExportButton onClick={triggerExport} loading={loading} />
            <ImportButton {...importProps} />
        </Space>
    );

    const moreMenu = (record: IOrder) => (
        <Menu
            mode="vertical"
            onClick={({ domEvent }) => domEvent.stopPropagation()}
        >
            <Menu.Item
                key="accept"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                disabled={record.status.text !== "Pending"}
                icon={
                    <Icons.CheckCircleOutlined
                        style={{
                            color: "#52c41a",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => {
                    mutate({
                        resource: "orders",
                        id: record.id,
                        values: {
                            status: {
                                id: 2,
                                text: "Ready",
                            },
                        },
                    });
                }}
            >
                {t("common:buttons.accept")}
            </Menu.Item>
            <Menu.Item
                key="reject"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                icon={
                    <Icons.CloseCircleOutlined
                        style={{
                            color: "#EE2A1E",
                            fontSize: 17,
                        }}
                    />
                }
                disabled={
                    record.status.text === "Delivered" ||
                    record.status.text === "Cancelled"
                }
                onClick={() =>
                    mutate({
                        resource: "orders",
                        id: record.id,
                        values: {
                            status: {
                                id: 5,
                                text: "Cancelled",
                            },
                        },
                    })
                }
            >
                {t("common:buttons.reject")}
            </Menu.Item>
        </Menu>
    );

    return (
        <Row gutter={[16, 16]}>
            <Col xl={6} lg={24} xs={24}>
                <Card bordered={false} title={t("orders:filter.title")}>
                    <Filter
                        formProps={searchFormProps}
                        filters={filters || []}
                    />
                </Card>
            </Col>
            <Col xl={18} xs={24}>
                <List
                    pageHeaderProps={{
                        extra: <Actions />,
                    }}
                >
                    <Table
                        {...tableProps}
                        rowKey="id"
                        scroll={{
                            x: true,
                        }}
                        onRow={(record, _rowIndex) => {
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
                            title={t("orders:fields.orderNumber")}
                            render={(value) => <TextField value={value} />}
                        />
                        <Table.Column
                            key="status.text"
                            dataIndex={["status", "text"]}
                            title={t("orders:fields.status")}
                            render={(value) => {
                                return <OrderStatus status={value} />;
                            }}
                            defaultSortOrder={getDefaultSortOrder(
                                "status",
                                sorter,
                            )}
                            sorter
                        />
                        <Table.Column
                            align="right"
                            key="amount"
                            dataIndex="amount"
                            title={t("orders:fields.amount")}
                            defaultSortOrder={getDefaultSortOrder(
                                "amount",
                                sorter,
                            )}
                            sorter
                            render={(value) => {
                                return (
                                    <NumberField
                                        options={{
                                            currency: "USD",
                                            style: "currency",
                                            notation: "compact",
                                        }}
                                        value={value}
                                    />
                                );
                            }}
                        />
                        <Table.Column
                            key="store.id"
                            dataIndex={["store", "title"]}
                            title={t("orders:fields.store")}
                        />
                        <Table.Column
                            key="user.fullName"
                            dataIndex={["user", "fullName"]}
                            title={t("orders:fields.user")}
                        />
                        <Table.Column<IOrder>
                            key="products"
                            dataIndex="products"
                            title={t("orders:fields.products")}
                            render={(_, record) => (
                                <Popover
                                    content={
                                        <ul>
                                            {record.products.map((product) => (
                                                <li key={product.id}>
                                                    {product.name}
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                    title="Products"
                                    trigger="hover"
                                >
                                    {`${record.products.length} Items`}
                                </Popover>
                            )}
                        />
                        <Table.Column
                            key="createdAt"
                            dataIndex="createdAt"
                            title={t("orders:fields.createdAt")}
                            render={(value) => (
                                <DateField value={value} format="LLL" />
                            )}
                            sorter
                        />
                        <Table.Column<IOrder>
                            fixed="right"
                            title={t("common:table.actions")}
                            dataIndex="actions"
                            key="actions"
                            align="center"
                            render={(_value, record) => (
                                <Dropdown
                                    overlay={moreMenu(record)}
                                    trigger={["click"]}
                                >
                                    <Icons.MoreOutlined
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            fontSize: 24,
                                        }}
                                    />
                                </Dropdown>
                            )}
                        />
                    </Table>
                </List>
            </Col>
        </Row>
    );
};

const Filter: React.FC<{ formProps: FormProps; filters: CrudFilters }> = (
    props,
) => {
    const t = useTranslate();

    const { formProps, filters } = props;
    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "stores",
        defaultValue: getDefaultFilter("store.id", filters),
    });

    const { selectProps: orderSelectProps } = useSelect<IStore>({
        resource: "orderStatuses",
        optionLabel: "text",
        optionValue: "text",
    });

    const { selectProps: userSelectProps } = useSelect<IStore>({
        resource: "users",
        optionLabel: "fullName",
    });

    const { RangePicker } = DatePicker;

    return (
        <Form
            layout="vertical"
            initialValues={{
                store: getDefaultFilter("store.id", filters),
                status: getDefaultFilter("status.text", filters),
                createdAt: [
                    dayjs(getDefaultFilter("createdAt", filters, "gte")),
                    dayjs(getDefaultFilter("createdAt", filters, "lte")),
                ],
            }}
            {...formProps}
        >
            <Row gutter={[10, 0]} align="bottom">
                <Col xl={24} md={8}>
                    <Form.Item label={t("orders:filter.search.label")} name="q">
                        <Input
                            placeholder={t("orders:filter.search.placeholder")}
                            prefix={<Icons.SearchOutlined />}
                        />
                    </Form.Item>
                </Col>
                <Col xl={24} md={8}>
                    <Form.Item
                        label={t("orders:filter.status.label")}
                        name="status"
                    >
                        <Select
                            {...orderSelectProps}
                            allowClear
                            placeholder={t("orders:filter.status.placeholder")}
                        />
                    </Form.Item>
                </Col>
                <Col xl={24} md={8}>
                    <Form.Item
                        label={t("orders:filter.store.label")}
                        name="store"
                    >
                        <Select
                            {...storeSelectProps}
                            allowClear
                            placeholder={t("orders:filter.store.placeholder")}
                        />
                    </Form.Item>
                </Col>
                <Col xl={24} md={8}>
                    <Form.Item
                        label={t("orders:filter.user.label")}
                        name="user"
                    >
                        <Select
                            {...userSelectProps}
                            allowClear
                            placeholder={t("orders:filter.user.placeholder")}
                        />
                    </Form.Item>
                </Col>
                <Col xl={24} md={8}>
                    <Form.Item
                        label={t("orders:filter.createdAt.label")}
                        name="createdAt"
                    >
                        <RangePicker />
                    </Form.Item>
                </Col>
                <Col xl={24} md={8}>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            block
                        >
                            {t("orders:filter.submit")}
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
