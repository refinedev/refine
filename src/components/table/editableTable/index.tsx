import React, { useState } from "react";
import { Table as AntdTable, Space, Form, Button } from "antd";
import {
    TablePaginationConfig,
    TableProps as AntdTableProps,
} from "antd/lib/table";

import Cell from "rc-table/lib/Cell";

import { Column, EditButton, DeleteButton, ShowButton } from "@components";
import { Filters, Sort } from "@interfaces";
import { useList, useTranslate } from "@hooks";
import {
    getDefaultSortOrder,
    getDefaultFilteredValue,
} from "@definitions/table";

export interface TableProps extends AntdTableProps<any> {
    resourceName?: string;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    filter?: { [key: string]: number[] | string[] };
}

export const EditableTable: React.FC<TableProps> = ({
    resourceName,
    pagination,
    canEdit,
    canDelete,
    canShow,
    children,
    filter,
    ...rest
}) => {
    const defaultCurrent = 1;
    const defaultPageSize = 10;

    const permanentFilter = filter;

    if (!resourceName) {
        throw new Error(`resource not found!`);
    }

    const [current, setCurrent] = useState(
        (pagination && pagination.current) || defaultCurrent,
    );
    const [pageSize, setPageSize] = useState(
        (pagination && pagination.pageSize) || defaultPageSize,
    );

    const [sort, setSort] = useState<Sort>(getDefaultSortOrder(children));
    const [filters, setFilters] = useState<Filters>(
        getDefaultFilteredValue(children),
    );

    const { data, isFetching, refetch } = useList(resourceName, {
        pagination: { current, pageSize },
        filters: { ...permanentFilter, ...filters },
        sort,
    });

    const translate = useTranslate();

    // const [form] = Form.useForm();

    // console.log("data: ", data)
    // console.log("form: ", form.getFieldValue("title"))

    const onChange = (
        pagination: TablePaginationConfig,
        filters: Filters,
        sorter: Sort,
    ) => {
        const { current, pageSize } = pagination;
        setCurrent(current || defaultCurrent);
        setPageSize(pageSize || defaultPageSize);

        setFilters(filters);
        setSort(sorter);

        refetch();
    };

    const renderActions = (): React.ReactNode => {
        if (canEdit || canDelete || canShow) {
            return (
                <Column
                    title={translate("common:table.actions", "Actions")}
                    dataIndex="actions"
                    key="actions"
                    render={(
                        _text: string | number,
                        record: {
                            id: string | number;
                        },
                    ): React.ReactNode => (
                        <Space>
                            {canEdit && (
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                            )}
                            {canDelete && (
                                <DeleteButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                            )}
                            {canShow && (
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                            )}
                        </Space>
                    )}
                />
            );
        }

        return null;
    };

    console.log("Edtable Tanle children: ", children);

    return (
        <>
            {/* <Form
                form={form}
                // onFieldsChange={(changedFields, allFields) => {
                //     console.log("changedFields: ", changedFields)
                //     console.log("allFields: ", allFields)
                // }}
                onValuesChange={(changedValues) => {
                    console.log("changedValues: ", changedValues)
                }}
            > */}

            <AntdTable
                data-testid="ant-tab"
                style={{ width: "100%" }}
                dataSource={data?.data}
                loading={isFetching}
                pagination={{
                    ...pagination,
                    current,
                    pageSize,
                    total: data?.total,
                }}
                onChange={onChange}
                {...rest}
                components={{
                    body: {
                        row: EditableRow,
                        cell: EditableCell,
                    },
                }}
                // ts-ignore
                onRow={(data, index) => ({ data, index } as any)}
                // rowSelection={{renderCell: (value, record, index, originNode) => {

                // }}}
            >
                {children}
                {renderActions()}
                <Column title="operations" key="operations" />
            </AntdTable>
            {/* </Form> */}
        </>
    );
};

const EditableRow: React.FC<any> = ({ children, record, ...rest }) => {
    const [form] = Form.useForm();

    console.log("EditableRow children: ", children);

    console.log("EditableRow record: ", record);
    console.log("EditableRow rest: ", rest);

    return (
        <Form
            component={false}
            form={form}
            onFieldsChange={(changedfields) => {
                console.log("changedfields: ", changedfields);
            }}
        >
            <tr>
                {children}
                <Cell
                    key="operations"
                    render={(): // _text: string | number,
                    // record: {
                    //     id: string | number;
                    // },
                    React.ReactNode => (
                        <Space>
                            <Button
                                onClick={() => {
                                    console.log(
                                        "operation edit record: ",
                                        record,
                                    );
                                }}
                            >
                                Edit
                            </Button>
                        </Space>
                    )}
                />
            </tr>
        </Form>
    );
};

const EditableCell: React.FC<any> = (props) => {
    console.log("EditableCell props: ", props);

    return <td {...props} />;
};
