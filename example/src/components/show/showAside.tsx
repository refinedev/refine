import * as React from "react";
import { Card } from "antd";

export const ShowAside: React.FC<{ record: any }> = ({ record }) => {
    return (
        <Card
            style={{
                width: 300,
            }}
        >
            <p>{record?.title}</p>
            <p>{record?.slug}</p>
            <p>{record?.status}</p>
            <p>{record?.content}</p>
        </Card>
    );
};
