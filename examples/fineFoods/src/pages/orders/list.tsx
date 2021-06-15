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
    Row,
    Col,
} from "@pankod/refine";
import { Dayjs } from "dayjs";

import { IOrder, IStore } from "interfaces";

export const OrderList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps, sorter, formProps } = useTable<IOrder>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
        onSearch: (params: {
            q: string;
            store: string;
            user: string;
            createdAt: [Dayjs, Dayjs];
        }) => {
            const filters: CrudFilters = [];
            const { q, store, user, createdAt } = params;

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

    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "stores",
    });

    const { selectProps: userSelectProps } = useSelect<IStore>({
        resource: "users",
        optionLabel: "fullName",
    });

    const { RangePicker } = DatePicker;

    return (
        <Row gutter={[16, 16]}>
            <Col md={5}>
                <Card title="Filter">
                    <Form layout="vertical" {...formProps}>
                        <Form.Item label="Search" name="q">
                            <Input prefix={<Icons.SearchOutlined />} />
                        </Form.Item>
                        <Form.Item label="Store" name="store">
                            <Select
                                {...storeSelectProps}
                                allowClear
                                placeholder="Search Stores"
                            />
                        </Form.Item>
                        <Form.Item label="User" name="user">
                            <Select
                                {...userSelectProps}
                                allowClear
                                placeholder="Search Users"
                            />
                        </Form.Item>
                        <Form.Item label="Created At" name="createdAt">
                            <RangePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">
                                Filter
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>

            <Col md={19}>
                <List {...props}>
                    <Table {...tableProps} rowKey="id">
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
                                return <span>{value}</span>;
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
                                    title="Productssss"
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
                    </Table>
                </List>
            </Col>
        </Row>
    );
};
