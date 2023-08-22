import React from "react";
import { Card, theme, Skeleton } from "antd";
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
        console.error("Error fetching dashboard data", isError);
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
                {isLoading ? (
                    <Skeleton.Avatar active={true} size={45} />
                ) : (
                    <Text size="xxxl" strong>
                        {data.data[type].totalCount}
                    </Text>
                )}
            </div>
        </Card>
    );
};
