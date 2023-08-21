import React from "react";
import {
    CreateButton,
    DeleteButton,
    FilterDropdown,
    SaveButton,
    ShowButton,
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
} from "antd";
import {
    UnorderedListOutlined,
    AppstoreOutlined,
    PlusSquareOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";

import { ContactStatusTag } from "../../../components/contact/status-tag";
import { ContactStatus } from "../../../enums/contact-status";
import { ContactCard } from "../../../components/contact/card";

import { Contact } from "../../../interfaces/graphql";
import styles from "./index.module.css";

type Props = React.PropsWithChildren<{}>;

export const ContactsPageWrapper: React.FC<Props> = ({ children }) => {
    const [type, setType] = React.useState("table");
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const {
        tableProps,
        searchFormProps,
        tableQueryResult,
        setCurrent,
        setPageSize,
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
                    field: "company.name",
                    value: undefined,
                    operator: "contains",
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
        resource: "contacts",
        meta: {
            operation: "contacts",
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

    const renderContent = () => {
        if (type === "table") {
            return (
                <Table {...tableProps} rowKey="id">
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
                        dataIndex={["company", "name"]}
                        title="Company"
                        filterDropdown={(props) => (
                            <FilterDropdown {...props}>
                                <Input placeholder="Search Company" />
                            </FilterDropdown>
                        )}
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
                        filterDropdown={(props) => (
                            <FilterDropdown {...props}>
                                <Select
                                    style={{ width: "200px" }}
                                    defaultValue={null}
                                    mode="multiple"
                                    options={[
                                        {
                                            label: "New",
                                            value: ContactStatus.NEW,
                                        },
                                        {
                                            label: "Contacted",
                                            value: ContactStatus.CONTACTED,
                                        },
                                        {
                                            label: "Interested",
                                            value: ContactStatus.INTERESTED,
                                        },
                                        {
                                            label: "Unqualified",
                                            value: ContactStatus.UNQUALIFIED,
                                        },
                                        {
                                            label: "Qualified",
                                            value: ContactStatus.QUALIFIED,
                                        },
                                        {
                                            label: "Negotiation",
                                            value: ContactStatus.NEGOTIATION,
                                        },
                                        {
                                            label: "Lost",
                                            value: ContactStatus.LOST,
                                        },
                                        {
                                            label: "Won",
                                            value: ContactStatus.WON,
                                        },
                                        {
                                            label: "Churned",
                                            value: ContactStatus.CHURNED,
                                        },
                                    ]}
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
        }

        const { data } = tableQueryResult;

        return (
            <div style={{ marginTop: "1rem" }}>
                <Row gutter={[32, 32]}>
                    {data?.data.map((contact) => (
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
                    total={data?.total}
                    onChange={(page, pageSize) => {
                        setCurrent(page);
                        setPageSize(pageSize);
                    }}
                />
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <CreateButton block size="large" icon={<PlusSquareOutlined />}>
                    Add new Contact
                </CreateButton>
                <div className={styles.search}>
                    <Form {...searchFormProps} layout="inline">
                        <Form.Item name="name">
                            <Input size="large" placeholder="Search by name" />
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

            {renderContent()}
            {children}
        </div>
    );
};
