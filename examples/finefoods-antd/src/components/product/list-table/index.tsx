import { HttpError, getDefaultFilter, useTranslate } from "@refinedev/core";
import {
    EditButton,
    FilterDropdown,
    NumberField,
    ShowButton,
    getDefaultSortOrder,
    useSelect,
    useTable,
} from "@refinedev/antd";
import {
    ICategory,
    IProduct,
    IProductFilterVariables,
} from "../../../interfaces";
import {
    Avatar,
    Input,
    InputNumber,
    Select,
    Table,
    Typography,
    theme,
} from "antd";
import { ProductStatus } from "../status";
import { PaginationTotal } from "../../paginationTotal";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";

export const ProductListTable = () => {
    const { token } = theme.useToken();
    const t = useTranslate();

    const { tableProps, sorters, filters } = useTable<
        IProduct,
        HttpError,
        IProductFilterVariables
    >({
        filters: {
            initial: [
                {
                    field: "description",
                    operator: "contains",
                    value: "",
                },
                {
                    field: "name",
                    operator: "contains",
                    value: "",
                },
                {
                    field: "category.id",
                    operator: "in",
                    value: [],
                },
            ],
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
        defaultValue: getDefaultFilter("category.id", filters, "in"),
    });

    return (
        <Table
            {...tableProps}
            rowKey="id"
            scroll={{ x: true }}
            pagination={{
                ...tableProps.pagination,
                showTotal: (total) => (
                    <PaginationTotal total={total} entityName="orders" />
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
                            color: filtered ? token.colorPrimary : undefined,
                        }}
                    />
                )}
                defaultFilteredValue={getDefaultFilter("id", filters, "eq")}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <InputNumber
                            addonBefore="#"
                            style={{ width: "100%" }}
                            placeholder={t("products.filter.id.placeholder")}
                        />
                    </FilterDropdown>
                )}
            />
            <Table.Column
                title={t("products.fields.images.label")}
                dataIndex="images"
                key="images"
                render={(images: IProduct["images"]) => {
                    return (
                        <Avatar
                            shape="square"
                            src={images[0].url}
                            alt={images[0].name}
                        />
                    );
                }}
            />
            <Table.Column
                title={t("products.fields.name")}
                dataIndex="name"
                key="name"
                filterIcon={(filtered) => (
                    <SearchOutlined
                        style={{
                            color: filtered ? token.colorPrimary : undefined,
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
                            placeholder={t("products.filter.name.placeholder")}
                        />
                    </FilterDropdown>
                )}
            />
            <Table.Column
                title={t("products.fields.description")}
                dataIndex="description"
                key="description"
                filterIcon={(filtered) => (
                    <SearchOutlined
                        style={{
                            color: filtered ? token.colorPrimary : undefined,
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
                                "products.filter.description.placeholder",
                            )}
                        />
                    </FilterDropdown>
                )}
                render={(description: string) => {
                    return (
                        <Typography.Paragraph
                            ellipsis={{ rows: 1 }}
                            style={{
                                maxWidth: "416px",
                            }}
                        >
                            {description}
                        </Typography.Paragraph>
                    );
                }}
            />
            <Table.Column
                title={t("products.fields.price")}
                dataIndex="price"
                key="price"
                align="right"
                sorter
                defaultSortOrder={getDefaultSortOrder("price", sorters)}
                render={(price: number) => {
                    return (
                        <NumberField
                            value={price}
                            style={{
                                whiteSpace: "nowrap",
                            }}
                            options={{
                                style: "currency",
                                currency: "USD",
                            }}
                        />
                    );
                }}
            />
            <Table.Column
                title={t("products.fields.category")}
                dataIndex={["category", "title"]}
                key="category.id"
                defaultFilteredValue={getDefaultFilter(
                    "category.id",
                    filters,
                    "in",
                )}
                filterDropdown={(props) => {
                    return (
                        <FilterDropdown
                            {...props}
                            selectedKeys={props.selectedKeys.map((item) =>
                                Number(item),
                            )}
                        >
                            <Select
                                {...categorySelectProps}
                                style={{ width: "200px" }}
                                allowClear
                                mode="multiple"
                                placeholder={t(
                                    "products.filter.category.placeholder",
                                )}
                            />
                        </FilterDropdown>
                    );
                }}
            />
            <Table.Column
                title={t("products.fields.isActive.label")}
                dataIndex="isActive"
                key="isActive"
                sorter
                defaultSortOrder={getDefaultSortOrder("isActive", sorters)}
                defaultFilteredValue={getDefaultFilter(
                    "isActive",
                    filters,
                    "eq",
                )}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            style={{ width: "200px" }}
                            allowClear
                            mode="multiple"
                            placeholder={t(
                                "products.filter.isActive.placeholder",
                            )}
                        >
                            <Select.Option value="true">
                                {t("products.fields.isActive.true")}
                            </Select.Option>
                            <Select.Option value="false">
                                {t("products.fields.isActive.false")}
                            </Select.Option>
                        </Select>
                    </FilterDropdown>
                )}
                render={(isActive: boolean) => {
                    return <ProductStatus value={isActive} />;
                }}
            />
            <Table.Column
                title={t("table.actions")}
                key="actions"
                fixed="right"
                align="center"
                render={(_, record: IProduct) => {
                    return (
                        <EditButton
                            icon={<EyeOutlined />}
                            resource="products"
                            recordItemId={record.id}
                            hideText
                        />
                    );
                }}
            />
        </Table>
    );
};
