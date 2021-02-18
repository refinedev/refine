import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Card } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { PlusSquareOutlined } from "@ant-design/icons";
import humanizeString from "humanize-string";

import { TableProps } from "@components/table";
import { useSearchParams } from "@hooks/util";
import { useList } from "@hooks";
import { DefaultEmpty } from "./components";
import { OptionalComponent } from "@definitions";
export interface ListProps {
    resourceName: string;
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    empty?: React.FC | false;
    component?: any;
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

    const CustomWrapper = () => <CustomComponent>{Content()}</CustomComponent>;

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

    return CustomComponent ? CustomWrapper() : DefaultWrapper();
};
