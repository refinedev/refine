import { useTranslate, IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    Space,
    BooleanField,
    useEditableTable,
    Form,
    SaveButton,
    Button,
    Input,
    Checkbox,
    Dropdown,
    Icons,
    Menu,
    Avatar,
    NumberField,
    DateField,
    Grid,
    useDrawerForm,
} from "@pankod/refine-antd";

import { ICategory, IProduct } from "interfaces";
import { EditProduct } from "components/product";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const {
        tableProps,
        formProps,
        isEditing,
        saveButtonProps,
        cancelButtonProps,
        setId: setEditId,
    } = useEditableTable<ICategory>({
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
    });

    const t = useTranslate();

    const moreMenu = (record: ICategory) => (
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
                icon={
                    <Icons.FormOutlined
                        style={{
                            color: "#52c41a",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => {
                    setEditId?.(record.id);
                }}
            >
                {t("buttons.edit")}
            </Menu.Item>
        </Menu>
    );

    const breakpoint = Grid.useBreakpoint();

    return (
        <List>
            <Form {...formProps}>
                <Table
                    {...tableProps}
                    expandable={{
                        expandedRowRender: !breakpoint.xs
                            ? expandedRowRender
                            : undefined,
                    }}
                    rowKey="id"
                    onRow={(record) => ({
                        // eslint-disable-next-line
                        onClick: (event: any) => {
                            if (event.target.nodeName === "TD") {
                                setEditId && setEditId(record.id);
                            }
                        },
                    })}
                >
                    <Table.Column
                        key="title"
                        dataIndex="title"
                        title={t("categories.fields.title")}
                        render={(value, data: ICategory) => {
                            if (isEditing(data.id)) {
                                return (
                                    <Form.Item
                                        name="title"
                                        style={{ margin: 0 }}
                                    >
                                        <Input />
                                    </Form.Item>
                                );
                            }
                            return value;
                        }}
                    />
                    <Table.Column
                        key="isActive"
                        dataIndex="isActive"
                        title={t("categories.fields.isActive")}
                        /*  render={(value) => <BooleanField value={value} />} */
                        render={(value, data: ICategory) => {
                            if (isEditing(data.id)) {
                                return (
                                    <Form.Item
                                        name="isActive"
                                        style={{ margin: 0 }}
                                        valuePropName="checked"
                                    >
                                        <Checkbox />
                                    </Form.Item>
                                );
                            }
                            return <BooleanField value={value} />;
                        }}
                    />
                    <Table.Column<ICategory>
                        title={t("table.actions")}
                        dataIndex="actions"
                        key="actions"
                        align="center"
                        render={(_text, record) => {
                            if (isEditing(record.id)) {
                                return (
                                    <Space>
                                        <SaveButton
                                            {...saveButtonProps}
                                            size="small"
                                        />
                                        <Button
                                            {...cancelButtonProps}
                                            size="small"
                                        >
                                            {t("buttons.cancel")}
                                        </Button>
                                    </Space>
                                );
                            }
                            return (
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
                            );
                        }}
                    />
                </Table>
            </Form>
        </List>
    );
};

const CategoryProductsTable: React.FC<{ record: ICategory }> = ({ record }) => {
    const t = useTranslate();

    const { tableProps: postTableProps } = useTable<IProduct>({
        resource: "products",
        permanentFilter: [
            {
                field: "category.id",
                operator: "eq",
                value: record.id,
            },
        ],
        syncWithLocation: false,
    });

    const {
        drawerProps: editDrawerProps,
        formProps: editFormProps,
        saveButtonProps: editSaveButtonProps,
        show: editShow,
    } = useDrawerForm<IProduct>({
        action: "edit",
        resource: "products",
        redirect: false,
    });

    const moreMenu = (record: IProduct) => (
        <Menu
            mode="vertical"
            onClick={({ domEvent }) => domEvent.stopPropagation()}
        >
            <Menu.Item
                key="edit"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                icon={
                    <Icons.FormOutlined
                        style={{
                            color: "#52c41a",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => editShow(record.id)}
            >
                {t("buttons.edit")}
            </Menu.Item>
        </Menu>
    );

    return (
        <List title={t("products.products")} createButtonProps={undefined}>
            <Table {...postTableProps} rowKey="id">
                <Table.Column
                    dataIndex="images"
                    render={(value) => <Avatar size={74} src={value[0].url} />}
                    width={105}
                />
                <Table.Column
                    key="name"
                    dataIndex="name"
                    title={t("products.fields.name")}
                />
                <Table.Column
                    align="right"
                    key="price"
                    dataIndex="price"
                    title={t("products.fields.price")}
                    render={(value) => {
                        return (
                            <NumberField
                                options={{
                                    currency: "USD",
                                    style: "currency",
                                    notation: "compact",
                                }}
                                value={value / 100}
                            />
                        );
                    }}
                    sorter
                />
                <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title={t("products.fields.isActive")}
                    render={(value) => <BooleanField value={value} />}
                />
                <Table.Column
                    key="createdAt"
                    dataIndex="createdAt"
                    title={t("products.fields.createdAt")}
                    render={(value) => <DateField value={value} format="LLL" />}
                    sorter
                />
                <Table.Column<IProduct>
                    dataIndex="products_actions"
                    title={t("table.actions")}
                    render={(_, record) => (
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
            <EditProduct
                drawerProps={editDrawerProps}
                formProps={editFormProps}
                saveButtonProps={editSaveButtonProps}
            />
        </List>
    );
};

const expandedRowRender = (record: ICategory) => {
    return <CategoryProductsTable record={record} />;
};
