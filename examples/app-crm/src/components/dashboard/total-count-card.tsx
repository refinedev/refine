import React from "react";
import { Card, theme } from "antd";
import { useCustom } from "@refinedev/core";

import { Text } from "../text";
import { API_URL } from "../../providers/data";

export const DashboardTotalCountCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    type: "companies" | "contacts" | "deals";
}> = ({ icon, title, type }) => {
    const { token } = theme.useToken();
    const { data, isLoading, isError } = useCustom({
        method: "post",
        url: API_URL,
        meta: {
            rawQuery: `query Dashboard {
                ${type} {
                  totalCount
                }
              }`,
        },
    });

    if (isError) {
        // TODO: handle error message
        return null;
    }

    if (isLoading) {
        // TODO: handle loading state (skeleton)
        return null;
    }

    return (
        <Card style={{ height: "100%" }}>
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
                    {data.data[type].totalCount}
                </Text>
            </div>
        </Card>
    );
};
