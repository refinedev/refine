import {
    List,
    Table,
    Avatar,
    useTable,
    useTranslate,
    IResourceComponentsProps,
    DateField,
    BooleanField,
    Card,
    Input,
    Icons,
    Form,
    DatePicker,
    Button,
    CrudFilters,
    Space,
    ShowButton,
    EditButton,
    FormProps,
    Row,
    Col,
    AntdList,
} from "@pankod/refine";

import { IUser, IUserFilterVariables } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, searchFormProps } = useTable<
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
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <AntdList>
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
                            title={t("users:fields.avatar.label")}
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
                            key="isActive"
                            dataIndex="isActive"
                            title={t("products:fields.isActive")}
                            render={(value) => <BooleanField value={value} />}
                        />
                        <Table.Column
                            key="createdAt"
                            dataIndex="createdAt"
                            title={t("users:fields.createdAt")}
                            render={(value) => (
                                <DateField value={value} format="LLL" />
                            )}
                            sorter
                        />
                        <Table.Column<IUser>
                            title={t("common:table.actions")}
                            dataIndex="actions"
                            key="actions"
                            render={(_value, record) => (
                                <Space>
                                    <EditButton
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                    <ShowButton
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                </Space>
                            )}
                        />
                    </Table>
                </AntdList>
            </Col>
            <Col lg={6} xs={24}>
                <Card title={t("users:filter.title")}>
                    <Filter formProps={searchFormProps} />
                </Card>
            </Col>
        </Row>
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
