import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Row, Card } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { PlusSquareOutlined } from "@ant-design/icons";
import humanizeString from "humanize-string";
import qs from "query-string";

import { TextInput, FormItem } from "@components";
import { Filter } from "@containers";
import { TableProps } from "@components/table";
import { useList } from "@hooks";

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

    const {
        q,
        current = 1,
        pageSize = 10,
        ...filter
    }: {
        q?: string;
        current?: number;
        pageSize?: number;
    } = parsedSearchQuery;

    const { data, isFetching } = useList(resourceName, {
        pagination: { current, pageSize },
        search: q,
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
                    <TextInput />
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
