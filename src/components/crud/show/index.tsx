import React, { createElement, FC } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "antd";
import pluralize from "pluralize";

import { BaseRecord } from "@interfaces";

import { useOne } from "@hooks";

export interface ShowProps {
    resourceName: string;
    aside?: FC<{ record?: BaseRecord }>;
    component?: FC<{ record?: BaseRecord }>;
}

export const Show: React.FC<ShowProps> = ({
    resourceName,
    aside,
    component,
    children,
}) => {
    const { id } = useParams<Record<string, string>>();

    const { data, isLoading } = useOne(resourceName, id);

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName,
                record: data?.data,
            });
        }
        return child;
    });

    return (
        <Row gutter={[16, 16]}>
            <Col flex="1">
                {component ? (
                    React.createElement(
                        component,
                        {
                            record: data?.data,
                        },
                        childrenWithProps,
                    )
                ) : (
                    <Card
                        title={`Show ${pluralize.singular(resourceName)}`}
                        loading={isLoading}
                    >
                        {childrenWithProps}
                    </Card>
                )}
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
