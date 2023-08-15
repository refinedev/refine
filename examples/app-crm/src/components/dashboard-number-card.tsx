import React from "react";
import { Card, theme } from "antd";

import { Text } from "./text";

export const DashboardNumberCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    number: number;
}> = ({ icon, title, number }) => {
    const { token } = theme.useToken();

    return (
        <Card>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    {React.cloneElement(icon as any, {
                        style: {
                            color: token.colorPrimary,
                            fontSize: "1rem",
                        },
                    })}
                    <Text size="md" style={{ marginLeft: ".5rem" }}>
                        {title}
                    </Text>
                </div>
                <Text size="xxxl" strong>
                    {number}
                </Text>
            </div>
        </Card>
    );
};
