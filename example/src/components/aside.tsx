import React from "react";
import { Card, CardProps } from "antd";

export const Aside: React.FC<CardProps> = (props: any) => {
    return (
        <Card {...props} title="Post details" extra={<a href="#">More</a>}>
            <p>Posts will only be published once an editor approves them</p>
        </Card>
    );
};
