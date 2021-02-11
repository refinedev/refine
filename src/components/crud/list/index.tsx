import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Card } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { PlusSquareOutlined } from "@ant-design/icons";
import humanizeString from "humanize-string";

import { TableProps } from "@components/table";
import { useSearchParams } from "@hooks/util";
import { useList } from "@hooks";

export interface ListProps {
    resourceName?: string;
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
}

export const List: React.FC<ListProps> = ({
    resourceName,
    canCreate,
    canEdit,
    canDelete,
    children,
}) => {
    const queryParams = useSearchParams();
    const history = useHistory();

    let current = 1;
    const queryParamCurrent = queryParams.current;
    if (queryParamCurrent) {
        current = +queryParamCurrent;
    }

    let pageSize = 10;
    const queryParamPageSize = queryParams.pageSize;
    if (queryParamPageSize) {
        pageSize = +queryParamPageSize;
    }

    const { data, isFetching } = useList(resourceName, {
        pagination: { current, pageSize },
    });

    if (!resourceName) {
        // TODO: render resource error page
        return <span>params error</span>;
    }

    const pagination: TablePaginationConfig = {
        total: data?.total,
        current,
        pageSize,
        defaultCurrent: 1,
        defaultPageSize: 10,
        position: ["bottomCenter"],
    };

    const childrenWithProps = React.Children.map(children, child => {
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
        <Card
            bodyStyle={{ padding: 0 }}
            title={humanizeString(resourceName)}
            extra={
                canCreate && (
                    <Button
                        onClick={() =>
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
            <Row>{childrenWithProps}</Row>
        </Card>
    );
};
