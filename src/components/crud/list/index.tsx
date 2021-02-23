import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Card } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import humanizeString from "humanize-string";

import { TableProps } from "@components/table";
export interface ListProps {
    resourceName: string;
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
}

export const List: React.FC<ListProps> = ({
    resourceName,
    canCreate,
    canEdit,
    canDelete,
    canShow,
    children,
}) => {
    const history = useHistory();

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement<TableProps>(child, {
                resourceName,
                canEdit,
                canDelete,
                canShow,
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
            {childrenWithProps}
        </Card>
    );
};
