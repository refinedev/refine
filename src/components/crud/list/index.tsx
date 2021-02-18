import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Row, Card } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { PlusSquareOutlined } from "@ant-design/icons";
import humanizeString from "humanize-string";
import qs from "query-string";

import { Filter } from "@containers";
import { TableProps } from "@components/table";
import { useList } from "@hooks";
import { DefaultEmpty } from "./components";
import { OptionalComponent } from "@definitions";
export interface ListProps {
    resourceName: string;
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    filters?: Record<string, unknown>;
    empty?: React.ComponentType | false;
    component?: React.ComponentType | string;
}

export const List: React.FC<ListProps> = ({
    resourceName,
    canCreate,
    canEdit,
    canDelete,
    filters,
    empty,
    children,
    component: CustomComponent,
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

    const showEmpty = (!data && !isFetching) || (data && !data.data.length);

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

    const Content = () =>
        showEmpty ? (
            <OptionalComponent optional={empty}>
                <DefaultEmpty style={{ width: "100%", margin: "20px 0" }} />
            </OptionalComponent>
        ) : (
                childrenWithProps
            );

    const CustomWrapper = () =>
        CustomComponent
            ? React.createElement(CustomComponent ?? null, {}, Content())
            : null;

    const DefaultWrapper = () => (
        <Card
            bodyStyle={{ padding: 0 }}
            title={humanizeString(resourceName)}
            extra={
                canCreate && (
                    <Button
                        onClick={(): void =>
                            history.push(`/resources/${resourceName}/create`)
                        }
                        type="default"
                        icon={<PlusSquareOutlined />}
                    >
                        Create
                    </Button>
                )
            }
        >
            {Content()}
        </Card>
    );

    return (
        <>
            <Filter resourceName={resourceName}>{filters}</Filter>
            {CustomComponent ? CustomWrapper() : DefaultWrapper()}
        </>
    );
};