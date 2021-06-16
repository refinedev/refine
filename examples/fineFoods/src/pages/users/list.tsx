import {
    List,
    Table,
    Avatar,
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
} from "@pankod/refine";
import { OrderStatus } from "components";

import { IUser, IStore, IUserFilterVariables } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps, sorter, searchFormProps } = useTable<
        IUser,
        IUserFilterVariables
    >({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { q, status } = params;

            if (q) {
                filters.push({
                    field: "q",
                    operator: "eq",
                    value: q,
                });
            }

            if (status) {
                filters.push({
                    field: "status.text",
                    operator: "eq",
                    value: status,
                });
            }

            return filters;
        },
    });

    const t = useTranslate();

    return (
        <List
            {...props}
            Aside={
                <Card title={t("users:filter.title")}>
                    <Filter formProps={searchFormProps} />
                </Card>
            }
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="gsm"
                    dataIndex="gsm"
                    title={t("users:fields.gsm")}
                />
                <Table.Column
                    align="center"
                    key="avatar"
                    dataIndex={["avatar"]}
                    title={t("users:fields.avatar")}
                    render={(value) => <Avatar src={value[0].url} />}
                />
                <Table.Column
                    key="firstName"
                    dataIndex="firstName"
                    title={t("users:fields.firstName")}
                />
                <Table.Column
                    key="lastName"
                    dataIndex="lastName"
                    title={t("users:fields.lastName")}
                />
                <Table.Column
                    key="gender"
                    dataIndex="gender"
                    title={t("users:fields.gender")}
                />
                <Table.Column
                    key="createdAt"
                    dataIndex="createdAt"
                    title={t("users:fields.createdAt")}
                    render={(value) => <DateField value={value} format="LLL" />}
                    sorter
                />
                <Table.Column<IUser>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        <Space>
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

const Filter: React.FC<{ formProps: FormProps }> = (props) => {
    const t = useTranslate();

    const { RangePicker } = DatePicker;

    return (
        <Form layout="vertical" {...props.formProps}>
            <Form.Item label={t("users:filter.search.label")} name="q">
                <Input
                    placeholder={t("users:filter.search.placeholder")}
                    prefix={<Icons.SearchOutlined />}
                />
            </Form.Item>
            <Form.Item
                label={t("users:filter.createdAt.label")}
                name="createdAt"
            >
                <RangePicker />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary">
                    {t("users:filter.submit")}
                </Button>
            </Form.Item>
        </Form>
    );
};
