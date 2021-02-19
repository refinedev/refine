import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { PlusSquareOutlined } from "@ant-design/icons";
import humanizeString from "humanize-string";

import { TableProps } from "@components/table";
import { useList } from "@hooks";
import { DefaultEmpty } from "./components";
import { OptionalComponent } from "@definitions";
export interface ListProps {
    resourceName: string;
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    empty?: React.ComponentType | false;
    component?: React.ComponentType | string;
}

export const List: React.FC<ListProps> = ({
    resourceName,
    canCreate,
    canEdit,
    canDelete,
    empty,
    children,
    component: CustomComponent,
}) => {
    const history = useHistory();

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, isFetching, refetch } = useList(resourceName, {
        pagination: { current, pageSize },
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

    const onChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, (string | number | boolean)[] | null>,
    ) => {
        const { current, pageSize } = pagination;
        setCurrent(current || 1);
        setPageSize(pageSize || 10);

        console.log("filters", filters);

        refetch();
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement<TableProps>(child, {
                resourceName,
                dataSource: data?.data,
                loading: isFetching,
                pagination,
                onChange,
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

    return <>{CustomComponent ? CustomWrapper() : DefaultWrapper()}</>;
};
