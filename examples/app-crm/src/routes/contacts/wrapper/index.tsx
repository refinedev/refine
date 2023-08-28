import React from "react";
import { CreateButton, SaveButton, useTable } from "@refinedev/antd";
import { Form, Input, Radio } from "antd";
import {
    UnorderedListOutlined,
    AppstoreOutlined,
    PlusSquareOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import debounce from "lodash/debounce";

import { TableView, CardView } from "../../../components/contact";
import { Contact } from "../../../interfaces/graphql";

import styles from "./index.module.css";

type Props = React.PropsWithChildren<{}>;

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
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
        },
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
                    tableProps={tableProps}
                    filters={filters}
                    sorters={sorters}
                />
            ) : (
                <CardView
                    tableProps={tableProps}
                    setPageSize={setPageSize}
                    setCurrent={setCurrent}
                />
            )}
            {children}
        </div>
    );
};
