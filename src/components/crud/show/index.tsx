import React, { createElement, FC } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "antd";
import pluralize from "pluralize";

import { useOne } from "@hooks";

export interface ShowProps
{
    resourceName: string;
    aside?: FC<{ record?: any }>;
    // component?: FC;
}

export const Show: React.FC<ShowProps> = ({
    resourceName,
    aside,
    // component,
    children,
}) =>
{
    const { id } = useParams<Record<string, string>>();

    const { data, isLoading } = useOne(resourceName, id);

    console.log("data: ", data)

    const childrenWithProps = React.Children.map(children, (child) =>
    {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName,
                record: data?.data,
            });
        }
        return child;
    });

    console.log("childrenWithProps ", childrenWithProps);

    // const Wrapper = component ?? Card;

    return (
        <Row gutter={[16, 16]}>
            <Col flex="1" >
                <Card
                    title={`Show ${pluralize.singular(resourceName)}`}
                    loading={isLoading}
                >
                    {childrenWithProps}
                </Card>
            </Col>
            <Col>
                {aside &&
                    createElement(aside, {
                        record: data?.data,
                    })}
            </Col>
        </Row>

    );
};

export { ShowSimple } from "./showSimple";
