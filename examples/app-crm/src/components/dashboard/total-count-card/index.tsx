import React, { FC, PropsWithChildren } from "react";
import { Card, Skeleton } from "antd";
import { useCustom } from "@refinedev/core";
import { Area, AreaConfig } from "@ant-design/plots";
import { AuditOutlined, ShopOutlined, TeamOutlined } from "@ant-design/icons";
import { Text } from "../../text";
import { API_URL } from "../../../providers/data";
import styles from "./index.module.css";

type Type = "companies" | "contacts" | "deals";

export const DashboardTotalCountCard: React.FC<{
    variant: Type;
}> = ({ variant }) => {
    const { data, isLoading, isError, error } = useCustom({
        method: "post",
        url: API_URL,
        meta: {
            rawQuery: `query Dashboard {
                ${variant} {
                  totalCount
                }
              }`,
        },
    });

    if (isError) {
        console.error("Error fetching dashboard data", error);
        return null;
    }

    const { primaryColor, secondaryColor, icon, title } = variants[variant];

    const config: AreaConfig = {
        data: mockLineData,
        tooltip: false,
        animation: false,
        xField: "index",
        yField: "value",
        xAxis: false,
        yAxis: false,
        smooth: true,
        areaStyle: () => {
            return {
                fill: `l(270) 0:${secondaryColor} 1:${primaryColor}`,
            };
        },
        line: {
            color: primaryColor,
        },
    };

    return (
        <Card
            style={{ height: "96px", padding: 0 }}
            bodyStyle={{
                padding: "8px 8px 8px 12px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
            }}
            size="small"
        >
            <div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        whiteSpace: "nowrap",
                    }}
                >
                    {icon}
                    <Text
                        size="md"
                        className="secondary"
                        style={{ marginLeft: "8px" }}
                    >
                        {title}
                    </Text>
                </div>
                <Text
                    size="xxxl"
                    strong
                    style={{
                        textAlign: "start",
                        marginLeft: "48px",
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {isLoading ? (
                        <Skeleton.Button
                            style={{
                                marginTop: "8px",
                                width: "74px",
                            }}
                        />
                    ) : (
                        data?.data[variant].totalCount
                    )}
                </Text>
            </div>
            <div className={styles.areaChartWrapper}>
                <Area {...config} autoFit />
            </div>
        </Card>
    );
};

const IconWrapper: FC<PropsWithChildren<{ color: string }>> = ({
    color,
    children,
}) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: color,
            }}
        >
            {children}
        </div>
    );
};

const variants: {
    [key in Type]: {
        primaryColor: string;
        secondaryColor?: string;
        icon: React.ReactNode;
        title: string;
    };
} = {
    companies: {
        primaryColor: "#1677FF",
        secondaryColor: "#E6F4FF",
        icon: (
            <IconWrapper color="#E6F4FF">
                <ShopOutlined
                    className="md"
                    style={{
                        color: "#1677FF",
                    }}
                />
            </IconWrapper>
        ),
        title: "Number of companies",
    },
    contacts: {
        primaryColor: "#52C41A",
        secondaryColor: "#F6FFED",
        icon: (
            <IconWrapper color="#F6FFED">
                <TeamOutlined
                    className="md"
                    style={{
                        color: "#52C41A",
                    }}
                />
            </IconWrapper>
        ),
        title: "Number of contacts",
    },
    deals: {
        primaryColor: "#FA541C",
        secondaryColor: "#FFF2E8",
        icon: (
            <IconWrapper color="#FFF2E8">
                <AuditOutlined
                    className="md"
                    style={{
                        color: "#FA541C",
                    }}
                />
            </IconWrapper>
        ),
        title: "Total deals in pipeline",
    },
};

const mockLineData = [
    {
        index: "1",
        value: 100,
    },
    {
        index: "2",
        value: 25,
    },
    {
        index: "3",
        value: 200,
    },
    {
        index: "4",
        value: 125,
    },
    {
        index: "4",
        value: 125,
    },
    {
        index: "5",
        value: 300,
    },
];
