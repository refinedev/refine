import React from "react";
import { Card, CardProps } from "antd";

export const Aside: React.FC<CardProps> = (props: any) => {
    return (
        <Card
            {...props}
            title="Users List Details"
            extra={<a href="#">More</a>}
        >
            <p>
                You can view personal data of users registered in your system in
                the user table.
            </p>
        </Card>
    );
};
