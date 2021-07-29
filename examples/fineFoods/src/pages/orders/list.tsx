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
    ShowButton,
    FormProps,
    Row,
    Col,
} from "@pankod/refine";
import { OrderStatus } from "components";

import { IOrder, IStore, IOrderFilterVariables } from "interfaces";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter, searchFormProps } = useTable<
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

    return (
        <Row gutter={[1, 1]}>
            <Col xl={6} lg={24} xs={24}>
                <Card
                    bordered={false}
                    title={
                        <span style={{ fontWeight: 800 }}>
                            {t("orders:filter.title")}
                        </span>
                    }
                >
                    <Filter formProps={searchFormProps} />
                </Card>
            </Col>
            <Col xl={18} xs={24}>
                <List
                    title={
                        <span style={{ fontWeight: 800 }}>
                            {t("orders:title")}{" "}
                        </span>
                    }
                >
                    <Table
                        {...tableProps}
                        rowKey="id"
                        scroll={{
                            x: true,
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
                            render={(_value, record) => (
                                <Space>
                                    <ShowButton
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                </Space>
                            )}
                        />
                    </Table>
                </List>
            </Col>
        </Row>
    );
};

const Filter: React.FC<{ formProps: FormProps }> = (props) => {
    const t = useTranslate();

    const { formProps } = props;
    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "stores",
    });

    const { selectProps: userSelectProps } = useSelect<IStore>({
        resource: "users",
        optionLabel: "fullName",
    });

    const { RangePicker } = DatePicker;

    return (
        <Form layout="vertical" {...formProps}>
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
                            allowClear
                            options={[
                                {
                                    label: t("enum:orderStatuses.waiting"),

                                    value: "waiting",
                                },
                                {
                                    label: t("enum:orderStatuses.ready"),
                                    value: "ready",
                                },
                                {
                                    label: t("enum:orderStatuses.on the way"),
                                    value: "on the way",
                                },
                                {
                                    label: t("enum:orderStatuses.delivered"),
                                    value: "delivered",
                                },
                                {
                                    label: t(
                                        "enum:orderStatuses.could not be delivered",
                                    ),
                                    value: "could not be delivered",
                                },
                            ]}
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
