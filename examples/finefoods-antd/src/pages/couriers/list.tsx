import {
    useTranslate,
    IResourceComponentsProps,
    getDefaultFilter,
} from "@refinedev/core";
import { EditButton, FilterDropdown, List, useTable } from "@refinedev/antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Table, Avatar, Typography, theme, InputNumber, Input } from "antd";
import InputMask from "react-input-mask";
import { ICourier } from "../../interfaces";
import { PaginationTotal } from "../../components";
import { CourierTableColumnRating } from "../../components/courier";

export const CourierList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { token } = theme.useToken();

    const { tableProps, filters } = useTable<ICourier>({
        filters: {
            initial: [
                {
                    field: "name",
                    operator: "contains",
                    value: "",
                },
                {
                    field: "licensePlate",
                    operator: "contains",
                    value: "",
                },
                {
                    field: "email",
                    operator: "contains",
                    value: "",
                },
            ],
        },
    });

    return (
        <List>
            <Table
                {...tableProps}
                rowKey="id"
                scroll={{ x: true }}
                pagination={{
                    ...tableProps.pagination,
                    showTotal: (total) => (
                        <PaginationTotal total={total} entityName="products" />
                    ),
                }}
            >
                <Table.Column
                    title={
                        <Typography.Text
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            ID #
                        </Typography.Text>
                    }
                    dataIndex="id"
                    key="id"
                    width={80}
                    render={(value) => (
                        <Typography.Text
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            #{value}
                        </Typography.Text>
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
                    defaultFilteredValue={getDefaultFilter("id", filters, "eq")}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <InputNumber
                                addonBefore="#"
                                style={{ width: "100%" }}
                                placeholder={t(
                                    "products.filter.id.placeholder",
                                )}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<ICourier>
                    key="avatar"
                    dataIndex="avatar"
                    title={t("couriers.fields.avatar.label")}
                    render={(_, record) => (
                        <Avatar
                            src={record.avatar?.[0]?.url}
                            alt={record?.avatar?.[0].name}
                        />
                    )}
                />
                <Table.Column<ICourier>
                    key="name"
                    dataIndex="name"
                    title={t("couriers.fields.name")}
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
                        "name",
                        filters,
                        "contains",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                placeholder={t(
                                    "couriers.filter.name.placeholder",
                                )}
                            />
                        </FilterDropdown>
                    )}
                    render={(_, record) => (
                        <Typography.Text
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >{`${record.name} ${record.surname}`}</Typography.Text>
                    )}
                />
                <Table.Column
                    key="licensePlate"
                    dataIndex="licensePlate"
                    title={() => {
                        return (
                            <Typography.Text
                                style={{
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {t("couriers.fields.licensePlate")}
                            </Typography.Text>
                        );
                    }}
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
                        "licensePlate",
                        filters,
                        "contains",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                placeholder={t(
                                    "couriers.filter.licensePlate.placeholder",
                                )}
                            />
                        </FilterDropdown>
                    )}
                    render={(value) => (
                        <Typography.Text
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            {value}
                        </Typography.Text>
                    )}
                />
                <Table.Column
                    dataIndex="gsm"
                    key="gsm"
                    title={t("couriers.fields.gsm")}
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
                        "gsm",
                        filters,
                        "eq",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <InputMask mask="(999) 999 99 99">
                                {/* 
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore */}
                                {(props: InputProps) => <Input {...props} />}
                            </InputMask>
                        </FilterDropdown>
                    )}
                    render={(value) => (
                        <Typography.Text
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            {value}
                        </Typography.Text>
                    )}
                />
                <Table.Column<ICourier>
                    dataIndex={["store", "title"]}
                    key="store"
                    title={t("couriers.fields.store")}
                />
                <Table.Column<ICourier>
                    dataIndex="id"
                    key="ratings"
                    title={t("couriers.fields.rating")}
                    render={(_, record) => {
                        return <CourierTableColumnRating courier={record} />;
                    }}
                />
                <Table.Column
                    title={t("table.actions")}
                    key="actions"
                    fixed="right"
                    align="center"
                    render={(_, record: ICourier) => {
                        return (
                            <EditButton
                                icon={<EyeOutlined />}
                                hideText
                                recordItemId={record.id}
                            />
                        );
                    }}
                />
            </Table>
        </List>
    );
};
