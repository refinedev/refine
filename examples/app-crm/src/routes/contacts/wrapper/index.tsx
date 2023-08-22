import React from "react";
import {
    CreateButton,
    DeleteButton,
    FilterDropdown,
    SaveButton,
    ShowButton,
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
} from "antd";
import {
    UnorderedListOutlined,
    AppstoreOutlined,
    PlusSquareOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";

import { ContactStatusTag } from "../../../components/contact/status-tag";
import { ContactStatus } from "../../../enums/contact-status";
import { ContactCard } from "../../../components/contact/card";

import { Contact } from "../../../interfaces/graphql";
import styles from "./index.module.css";

type Props = React.PropsWithChildren<{}>;
type TableViewProps = TableProps<Contact>;
type CardViewProps = TableProps<Contact> & {
    setCurrent: (current: number) => void;
    setPageSize: (pageSize: number) => void;
};

const statusOptions = Object.keys(ContactStatus).map((key) => ({
    label: `${key[0]}${key.slice(1).toLowerCase()}`,
    value: ContactStatus[key as keyof typeof ContactStatus],
}));
    
const TableView: React.FC<TableViewProps> = ({ ...rest }) => {

    const { selectProps } = useSelect({
        resource: "companies",
        optionLabel: "name",
        meta: {
            fields: ["id", "name"],
        },
    });
    return (
        <Table {...rest} rowKey="id">
            <Table.Column dataIndex="id" title="ID" />
            <Table.Column
                dataIndex="name"
                title="Name"
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input placeholder="Search Name" />
                    </FilterDropdown>
                )}
            />
            <Table.Column
                dataIndex="email"
                title="Email"
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input placeholder="Search Email" />
                    </FilterDropdown>
                )}
            />
            <Table.Column
                dataIndex={["company", "id"]}
                title="Company"
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
                render={(value: ContactStatus) => (
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
        <div style={{ marginTop: "1rem" }}>
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
                style={{ textAlign: "end", marginTop: "1rem" }}
                {...pagination}
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

    const { tableProps, searchFormProps, setCurrent, setPageSize } =
        useTable<Contact>({
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
                        company: ["id", "name"],
                    },
                    "jobTitle",
                    "status",
                ],
            },
        });

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
                                prefix={<SearchOutlined />}
                                placeholder="Search by name"
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
                <TableView {...tableProps} />
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
