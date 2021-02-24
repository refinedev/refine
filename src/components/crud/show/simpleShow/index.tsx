import React, { FC } from "react";
import { Card, CardProps, Col, Typography } from "antd";
import humanizeString from "humanize-string";

import { BaseRecord } from "@interfaces";

const { Title } = Typography;

type SimpleShowLayoutProps = CardProps & {
    aside?: FC;
    record?: BaseRecord;
};

export const SimpleShow: FC<SimpleShowLayoutProps> = ({
    children,
    record,
}) =>
{
    const renderChildrenWithPropsAndLabel = () =>
    {
        return React.Children.map(children, (child) =>
        {
            if (React.isValidElement(child)) {
                return (
                    <>
                        <Title level={5}>{humanizeString(child?.props.renderRecordKey)}</Title>
                        {React.cloneElement(child, {
                            record
                        })}
                    </>
                )
            }
            return child
        })
    }

    console.log("record: ", record);
    console.log("children: ", children);
    return (
        <Card title="Post Title" style={{ flex: 1 }}>
            <Col>
                {record && renderChildrenWithPropsAndLabel()}
            </Col>
        </Card>
    );
};
