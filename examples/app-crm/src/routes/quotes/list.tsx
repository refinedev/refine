import { FC, PropsWithChildren } from "react";
import {
    CreateButton,
    DeleteButton,
    EditButton,
    List,
    ShowButton,
    useTable,
} from "@refinedev/antd";
import { Avatar, Form, Input, Space, Table, Tooltip } from "antd";
import { PlusCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Quote, QuoteFilter } from "../../interfaces/graphql";
import {
    currencyNumber,
    getNameInitials,
    getRandomColorFromString,
} from "../../utilities";
import { Text, QuoteStatusTag } from "../../components";
import dayjs from "dayjs";
import { HttpError } from "@refinedev/core";

export const QuotesListPage: FC<PropsWithChildren> = ({ children }) => {
    const { tableProps, searchFormProps } = useTable<
        Quote,
        HttpError,
        QuoteFilter
    >({
        onSearch: (values) => {
            return [
                {
                    field: "title",
                    operator: "contains",
                    value: values.title,
                },
            ];
        },
        sorters: {
            initial: [
                {
                    field: "updatedAt",
                    order: "desc",
                },
            ],
        },
        meta: {
            fields: [
                "id",
                "title",
                "status",
                "total",
                "createdAt",
                { company: ["id", "name"] },
                { contact: ["id", "name"] },
                { salesOwner: ["id", "name"] },
            ],
        },
    });

    return (
        <>
            <List
                breadcrumb={false}
                headerButtons={() => {
                    return (
                        <Form
                            {...searchFormProps}
                            onChange={searchFormProps.form?.submit}
                            layout="inline"
                        >
                            <Form.Item name="title" noStyle>
                                <Input.Search
                                    size="large"
                                    placeholder="Search"
                                />
                            </Form.Item>
                        </Form>
                    );
                }}
                contentProps={{
                    style: {
                        marginTop: "28px",
                    },
                }}
                title={
                    <CreateButton
                        style={{
                            width: "192px",
                        }}
                        size="large"
                        type="primary"
                        icon={<PlusSquareOutlined />}
                    >
                        Add Quote
                    </CreateButton>
                }
            >
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="title" title="Title" />
                    <Table.Column<Quote>
                        dataIndex={["company", "name"]}
                        title="Company"
                        render={(value) => {
                            return (
                                <Space>
                                    <Avatar
                                        size="small"
                                        style={{
                                            textTransform: "uppercase",
                                            backgroundColor:
                                                getRandomColorFromString(value),
                                        }}
                                    >
                                        {getNameInitials({ name: value })}
                                    </Avatar>
                                    <Text
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {value}
                                    </Text>
                                </Space>
                            );
                        }}
                    />
                    <Table.Column
                        dataIndex="total"
                        title="Total Amount"
                        render={(value) => {
                            return (
                                <Text
                                    style={{
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {currencyNumber(value)}
                                </Text>
                            );
                        }}
                    />
                    <Table.Column<Quote>
                        dataIndex="status"
                        title="Stage"
                        render={(value) => {
                            return <QuoteStatusTag value={value} />;
                        }}
                    />
                    <Table.Column<Quote>
                        title="Participants"
                        render={(value) => {
                            const salesOwnerName = value.salesOwner?.name;
                            const contactName = value.contact?.name;

                            return (
                                <Space
                                    size={4}
                                    style={{
                                        textTransform: "uppercase",
                                    }}
                                >
                                    <Tooltip title={salesOwnerName}>
                                        <Avatar
                                            size="small"
                                            style={{
                                                backgroundColor:
                                                    getRandomColorFromString(
                                                        salesOwnerName,
                                                    ),
                                            }}
                                        >
                                            {getNameInitials({
                                                name: salesOwnerName,
                                            })}
                                        </Avatar>
                                    </Tooltip>
                                    <PlusCircleOutlined className="xs tertiary" />
                                    <Tooltip title={contactName}>
                                        <Avatar
                                            size="small"
                                            style={{
                                                backgroundColor:
                                                    getRandomColorFromString(
                                                        contactName,
                                                    ),
                                            }}
                                        >
                                            {getNameInitials({
                                                name: contactName,
                                            })}
                                        </Avatar>
                                    </Tooltip>
                                </Space>
                            );
                        }}
                    />
                    <Table.Column<Quote>
                        dataIndex={"createdAt"}
                        title="Created at"
                        render={(value) => {
                            return <Text>{dayjs(value).fromNow()}</Text>;
                        }}
                    />
                    <Table.Column<Quote>
                        title="Actions"
                        dataIndex="actions"
                        render={(_, record) => {
                            return (
                                <Space>
                                    <ShowButton
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                        style={{
                                            backgroundColor: "transparent",
                                        }}
                                    />
                                    <EditButton
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                        style={{
                                            backgroundColor: "transparent",
                                        }}
                                    />
                                    <DeleteButton
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                        style={{
                                            backgroundColor: "transparent",
                                        }}
                                    />
                                </Space>
                            );
                        }}
                    />
                </Table>
            </List>
            {children}
        </>
    );
};
