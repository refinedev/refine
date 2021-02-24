import React, { FC } from "react";
import { Card, CardProps, Col, Typography } from "antd";
import humanizeString from "humanize-string";

import { BaseRecord } from "@interfaces";

const { Title } = Typography;

type ShowSimpleProps = CardProps & {
    record?: BaseRecord;
};

export const ShowSimple: FC<ShowSimpleProps> = ({
    children,
    record,
    ...rest
}) => {
    const renderChildrenWithPropsAndLabel = () => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return (
                    <>
                        <Title level={5}>
                            {humanizeString(child?.props.renderRecordKey)}
                        </Title>
                        {React.cloneElement(child, {
                            record,
                        })}
                    </>
                );
            }
            return child;
        });
    };

    return (
        <Card style={{ flex: 1 }} {...rest}>
            <Col>{record && renderChildrenWithPropsAndLabel()}</Col>
        </Card>
    );
};
