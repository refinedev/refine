import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Card } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import humanizeString from "humanize-string";

import { TableProps } from "@components/table";
import { useTranslate } from "@hooks";

export interface ListProps {
    resourceName: string;
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
    const history = useHistory();

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement<TableProps>(child, {
                resourceName,
                canEdit,
                canDelete,
            });
        }
        return child;
    });
    const translate = useTranslate();


    return (
        <Card
            bodyStyle={{ padding: 0 }}
            title={translate(
                `common:resources.${humanizeString(resourceName)}.title`,
            )}
            extra={
                canCreate && (
                    <Button
                        onClick={(): void =>
                            history.push(`/resources/${resourceName}/create`)
                        }
                        type="default"
                        icon={<PlusSquareOutlined />}
                    >
                        {translate(`common:buttons.create`)}
                    </Button>
                )
            }
        >
            {childrenWithProps}
        </Card>
    );
};
