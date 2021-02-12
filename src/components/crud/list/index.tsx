import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Row, Card } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { PlusSquareOutlined } from "@ant-design/icons";
import humanizeString from "humanize-string";
import qs from "query-string";

import { TextInput, FormItem, SelectInput } from "@components";
import { Filter } from "@containers";
import { TableProps } from "@components/table";
import { useList } from "@hooks";
import { ReferenceInput } from "@components/inputs";

export interface ListProps {
    resourceName: string;
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    filters?: any;
}

export const List: React.FC<ListProps> = ({
    resourceName,
    canCreate,
    canEdit,
    canDelete,
    children,
}) => {
    const searchQuery = useLocation().search;
    const history = useHistory();

    const parsedSearchQuery = qs.parse(searchQuery);

    const { q, ...filter } = parsedSearchQuery;
    let { current = 1, pageSize = 10 } = parsedSearchQuery;

    current = Number(current);
    pageSize = Number(pageSize);

    const { data, isFetching } = useList(resourceName, {
        pagination: { current, pageSize },
        search: q as string | undefined,
        filter: filter as Record<string, unknown> | undefined,
    });

    const pagination: TablePaginationConfig = {
        total: data?.total,
        current,
        pageSize,
        defaultCurrent: 1,
        defaultPageSize: 10,
        position: ["bottomCenter"],
    };

    console.log("pagination", pagination);

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement<TableProps>(child, {
                resourceName,
                dataSource: data?.data,
                loading: isFetching,
                pagination,
                canEdit,
                canDelete,
            });
        }
        return child;
    });

    return (
        <React.Fragment>
            <Filter resourceName={resourceName}>
                <FormItem label="Search" name="q">
                    <TextInput placeholder="Search" />
                </FormItem>
                <FormItem label="Status" name="status">
                    <SelectInput
                        allowClear
                        placeholder="All Status"
                        options={[
                            {
                                label: "Active",
                                value: "active",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                        ]}
                    />
                </FormItem>
                <FormItem label="Category" name="categoryId">
                    <ReferenceInput
                        reference="categories"
                        optionText="title"
                        sort={{
                            field: "title",
                            order: "asc",
                        }}
                    >
                        <SelectInput allowClear placeholder="Select Category" />
                    </ReferenceInput>
                </FormItem>
            </Filter>
            <Card
                bodyStyle={{ padding: 0 }}
                title={humanizeString(resourceName)}
                extra={
                    canCreate && (
                        <Button
                            onClick={(): void =>
                                history.push(
                                    `/resources/${resourceName}/create`,
                                )
                            }
                            type="default"
                            icon={<PlusSquareOutlined />}
                        >
                            Create
                        </Button>
                    )
                }
            >
                <Row>{childrenWithProps}</Row>
            </Card>
        </React.Fragment>
    );
};
