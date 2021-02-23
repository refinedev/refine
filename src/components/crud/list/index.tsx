import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Row, Col } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import humanizeString from "humanize-string";

import { TableProps } from "@components/table";

export interface ListProps {
    resourceName: string;
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    aside?: React.FC | false;
}

export const List: React.FC<ListProps> = ({
    resourceName,
    canCreate,
    canEdit,
    canDelete,
    aside,
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

    return (
        <Row>
            <Col flex={1}>
                <Card
                    bodyStyle={{ padding: 0, flex: 1 }}
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
                    {childrenWithProps}
                </Card>
            </Col>

            {aside && <Col style={{ width: 200 }}>{aside}</Col>}
        </Row>
    );
};
