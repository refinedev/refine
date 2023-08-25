import React from "react";
import {
    CreateButton,
    DeleteButton,
    FilterDropdown,
    SaveButton,
    ShowButton,
    getDefaultSortOrder,
    useSelect,
    useTable,
} from "@refinedev/antd";
import {
    Form,
    Input,
    Radio,
    Select,
    Space,
    Table,
    Pagination,
    Row,
    Col,
    TableProps,
    Avatar,
    Button,
} from "antd";
import {
    UnorderedListOutlined,
    AppstoreOutlined,
    PlusSquareOutlined,
    SearchOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
    CrudFilters,
    CrudSorting,
    getDefaultFilter,
    useGetToPath,
} from "@refinedev/core";
import debounce from "lodash/debounce";

import { ContactStatusTag } from "../../../components/contact/status-tag";
import { ContactStatusEnum } from "../../../enums/contact-status";
import { ContactCard } from "../../../components/contact/card";
import { Text } from "../../../components";

import { Contact } from "../../../interfaces/graphql";
import styles from "./index.module.css";

type Props = React.PropsWithChildren<{}>;
type TableViewProps = TableProps<Contact> & {
    filters?: CrudFilters;
    sorters?: CrudSorting;
};
type CardViewProps = TableProps<Contact> & {
    setCurrent: (current: number) => void;
    setPageSize: (pageSize: number) => void;
};

const statusOptions = Object.keys(ContactStatusEnum).map((key) => ({
    label: `${key[0]}${key.slice(1).toLowerCase()}`,
    value: ContactStatusEnum[key as keyof typeof ContactStatusEnum],
}));

const TableView: React.FC<TableViewProps> = ({ filters, sorters, ...rest }) => {
    const { selectProps } = useSelect({
        resource: "companies",
        optionLabel: "name",
        meta: {
            fields: ["id", "name"],
        },
    });

    return (
        <Table
            {...rest}
            pagination={{
                ...rest.pagination,
                showTotal: (total) => {
                    return (
                        <span
                            style={{
                                marginLeft: "48px",
                            }}
                        >
                            <span className="ant-text secondary">{total}</span>{" "}
                            contacts in total
                        </span>
                    );
                },
            }}
            rowKey="id"
        >
            <Table.Column
                dataIndex="name"
                title="Name"
                width={200}
                defaultFilteredValue={getDefaultFilter("name", filters)}
                defaultSortOrder={getDefaultSortOrder("name", sorters)}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input placeholder="Search Name" />
                    </FilterDropdown>
                )}
                render={(_, record: Contact) => {
                    return (
                        <Space>
                            <Avatar
                                size="small"
                                src={record.avatarUrl}
                                alt={record.name}
                            />
                            <Text>{record.name}</Text>
                        </Space>
                    );
                }}
            />
            <Table.Column
                dataIndex="email"
                title="Email"
                defaultFilteredValue={getDefaultFilter("email", filters)}
                defaultSortOrder={getDefaultSortOrder("email", sorters)}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input placeholder="Search Email" />
                    </FilterDropdown>
                )}
            />
            <Table.Column
                dataIndex={["company", "id"]}
                title="Company"
                defaultFilteredValue={getDefaultFilter("company.id", filters)}
                defaultSortOrder={getDefaultSortOrder("company.id", sorters)}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            placeholder="Search Company"
                            style={{ width: 220 }}
                            {...selectProps}
                        />
                    </FilterDropdown>
                )}
                render={(_, record: Contact) => {
                    return <span>{record?.company.name}</span>;
                }}
            />
            <Table.Column
                dataIndex="jobTitle"
                title="Title"
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input placeholder="Search Title" />
                    </FilterDropdown>
                )}
            />
            <Table.Column
                dataIndex="status"
                title="Status"
                sorter
                defaultFilteredValue={getDefaultFilter("status", filters)}
                defaultSortOrder={getDefaultSortOrder("status", sorters)}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            style={{ width: "200px" }}
                            defaultValue={null}
                            mode="multiple"
                            options={statusOptions}
                        ></Select>
                    </FilterDropdown>
                )}
                render={(value: ContactStatusEnum) => (
                    <ContactStatusTag status={value} />
                )}
            />
            <Table.Column<Contact>
                title="Actions"
                dataIndex="actions"
                render={(_, record) => (
                    <Space>
                        <ShowButton
                            hideText
                            size="small"
                            recordItemId={record.id}
                        />
                        <Button
                            size="small"
                            href="tel:1234567890"
                            icon={<PhoneOutlined />}
                        />
                        <DeleteButton
                            hideText
                            size="small"
                            recordItemId={record.id}
                        />
                    </Space>
                )}
            />
        </Table>
    );
};

const CardView: React.FC<CardViewProps> = ({
    dataSource,
    pagination,
    setCurrent,
    setPageSize,
}) => {
    const navigate = useNavigate();
    const getToPath = useGetToPath();

    return (
        <div
            style={{
                marginTop: "1rem",
            }}
        >
            <Row gutter={[32, 32]}>
                {dataSource?.map((contact) => (
                    <Col key={contact.id} span="6">
                        <ContactCard
                            onClick={({ key }) => {
                                if (key === "show") {
                                    navigate(
                                        getToPath({
                                            action: "show",
                                            meta: {
                                                id: contact.id,
                                            },
                                        }) ?? "",
                                        {
                                            replace: true,
                                        },
                                    );
                                }
                            }}
                            contact={contact}
                        />
                    </Col>
                ))}
            </Row>

            <Pagination
                style={{ display: "flex", marginTop: "1rem" }}
                {...pagination}
                showTotal={(total) => {
                    return (
                        <span
                            style={{
                                marginLeft: "48px",
                            }}
                        >
                            <span className="ant-text secondary">{total}</span>{" "}
                            contacts in total
                        </span>
                    );
                }}
                onChange={(page, pageSize) => {
                    setCurrent(page);
                    setPageSize(pageSize);
                }}
            />
        </div>
    );
};

export const ContactsPageWrapper: React.FC<Props> = ({ children }) => {
    const [type, setType] = React.useState("table");

    const {
        tableProps,
        searchFormProps,
        setCurrent,
        setPageSize,
        filters,
        sorters,
    } = useTable<Contact>({
        filters: {
            initial: [
                {
                    field: "name",
                    value: undefined,
                    operator: "contains",
                },
                {
                    field: "email",
                    value: undefined,
                    operator: "contains",
                },
                {
                    field: "company.id",
                    value: undefined,
                    operator: "eq",
                },
                {
                    field: "jobTitle",
                    value: undefined,
                    operator: "contains",
                },
                {
                    field: "status",
                    value: undefined,
                    operator: "in",
                },
            ],
        },
        onSearch: (values: any) => {
            return [
                {
                    field: "name",
                    operator: "contains",
                    value: values.name,
                },
            ];
        },
        meta: {
            fields: [
                "id",
                "name",
                "email",
                {
                    company: ["id", "name", "avatarUrl"],
                },
                "jobTitle",
                "status",
                "avatarUrl",
            ],
        },
    });

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchFormProps?.onFinish?.({
            name: e.target.value,
        });
    };
    const debouncedOnChange = debounce(onSearch, 500);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <CreateButton block size="large" icon={<PlusSquareOutlined />}>
                    Add new Contact
                </CreateButton>
                <div className={styles.search}>
                    <Form {...searchFormProps} layout="inline">
                        <Form.Item name="name">
                            <Input
                                size="large"
                                prefix={
                                    <SearchOutlined className="anticon tertiary" />
                                }
                                placeholder="Search by name"
                                onChange={debouncedOnChange}
                            />
                        </Form.Item>
                        <SaveButton
                            hidden
                            onClick={searchFormProps.form?.submit}
                        />
                    </Form>
                    <Radio.Group
                        size="large"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <Radio.Button value="table">
                            <UnorderedListOutlined />
                        </Radio.Button>
                        <Radio.Button value="card">
                            <AppstoreOutlined />
                        </Radio.Button>
                    </Radio.Group>
                </div>
            </div>

            {type === "table" ? (
                <TableView
                    {...tableProps}
                    filters={filters}
                    sorters={sorters}
                />
            ) : (
                <CardView
                    setPageSize={setPageSize}
                    setCurrent={setCurrent}
                    {...tableProps}
                />
            )}
            {children}
        </div>
    );
};
